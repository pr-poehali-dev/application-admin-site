import json
import os
import base64
import boto3
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context):
    '''API для работы с контентом сайта и каталогом масел'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    try:
        # Handle image upload separately (no DB connection needed)
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'upload_image':
                image_data = body.get('image_data')
                filename = body.get('filename', 'image.jpg')
                
                if not image_data:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Нет данных изображения'})
                    }
                
                s3 = boto3.client('s3',
                    endpoint_url='https://bucket.poehali.dev',
                    aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                    aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
                )
                
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                key = f'hero/{timestamp}_{filename}'
                
                image_bytes = base64.b64decode(image_data)
                content_type = 'image/jpeg'
                if filename.lower().endswith('.png'):
                    content_type = 'image/png'
                elif filename.lower().endswith('.webp'):
                    content_type = 'image/webp'
                
                s3.put_object(
                    Bucket='files',
                    Key=key,
                    Body=image_bytes,
                    ContentType=content_type
                )
                
                cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'url': cdn_url})
                }
        
        # For other operations, connect to DB
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor(cursor_factory=RealDictCursor)
        schema = os.environ['MAIN_DB_SCHEMA']
        
        path_type = event.get('queryStringParameters', {}).get('type', 'content')
        
        if method == 'GET' and path_type == 'oils':
            cur.execute(f"SELECT * FROM {schema}.oils ORDER BY category_slug, name")
            oils = cur.fetchall()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(oil) for oil in oils], default=str)
            }
        
        elif method == 'GET' and path_type == 'categories':
            cur.execute(f"SELECT * FROM {schema}.oil_categories ORDER BY name")
            categories = cur.fetchall()
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(cat) for cat in categories], default=str)
            }
        
        elif method == 'GET':
            cur.execute(f"SELECT * FROM {schema}.site_content ORDER BY section, key")
            content = cur.fetchall()
            
            result = {}
            for item in content:
                result[item['key']] = {
                    'value': item['value'],
                    'section': item['section']
                }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result)
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            key = body.get('key')
            value = body.get('value')
            
            if not key or value is None:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Key и value обязательны'})
                }
            
            cur.execute(
                f"""
                UPDATE {schema}.site_content 
                SET value = %s, updated_at = CURRENT_TIMESTAMP 
                WHERE key = %s
                RETURNING *
                """,
                (value, key)
            )
            
            updated = cur.fetchone()
            conn.commit()
            
            if not updated:
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Контент не найден'})
                }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'content': dict(updated)
                })
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            if path_type == 'categories':
                name = body.get('name')
                slug = body.get('slug')
                cur.execute(f"INSERT INTO {schema}.oil_categories (name, slug) VALUES (%s, %s) RETURNING *", (name, slug))
                category = cur.fetchone()
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(category), default=str)
                }
            
            elif path_type == 'oils':
                name = body.get('name')
                emoji = body.get('emoji', '🌾')
                category = body.get('category')
                description = body.get('description', '')
                audio_url = body.get('audioUrl', '')
                
                cur.execute(
                    f"""INSERT INTO {schema}.oils (name, emoji, category_slug, description, audio_url) 
                    VALUES (%s, %s, %s, %s, %s) RETURNING *""",
                    (name, emoji, category, description, audio_url)
                )
                oil = cur.fetchone()
                conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(oil), default=str)
                }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
        
    except Exception as e:
        if 'conn' in locals():
            conn.rollback()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()