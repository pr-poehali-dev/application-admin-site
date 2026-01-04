import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context):
    '''API для работы с контентом сайта'''
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
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor(cursor_factory=RealDictCursor)
    schema = os.environ['MAIN_DB_SCHEMA']
    
    try:
        if method == 'GET':
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
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
        
    except Exception as e:
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
        cur.close()
        conn.close()
