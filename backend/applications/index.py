import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context):
    '''API для работы с заявками с сайта'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor(cursor_factory=RealDictCursor)
    schema = os.environ['MAIN_DB_SCHEMA']
    
    try:
        if method == 'GET':
            cur.execute(f"""
                SELECT id, name, phone, email, message, status, created_at 
                FROM {schema}.applications 
                ORDER BY created_at DESC
            """)
            applications = cur.fetchall()
            
            result = []
            for app in applications:
                result.append({
                    'id': app['id'],
                    'name': app['name'],
                    'phone': app['phone'],
                    'email': app['email'],
                    'message': app['message'],
                    'status': app['status'],
                    'created_at': app['created_at'].isoformat() if app['created_at'] else None
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            name = body.get('name', '')
            phone = body.get('phone', '')
            email = body.get('email', '')
            message = body.get('message', '')
            
            if not name or not phone:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Имя и телефон обязательны'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                f"""
                INSERT INTO {schema}.applications (name, phone, email, message, status, created_at) 
                VALUES (%s, %s, %s, %s, 'new', CURRENT_TIMESTAMP)
                RETURNING id, name, phone, email, message, status, created_at
                """,
                (name, phone, email, message)
            )
            
            new_app = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'application': {
                        'id': new_app['id'],
                        'name': new_app['name'],
                        'phone': new_app['phone'],
                        'email': new_app['email'],
                        'message': new_app['message'],
                        'status': new_app['status'],
                        'created_at': new_app['created_at'].isoformat() if new_app['created_at'] else None
                    }
                }),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            app_id = body.get('id')
            status = body.get('status')
            
            if not app_id or not status:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'ID и статус обязательны'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                f"""
                UPDATE {schema}.applications 
                SET status = %s 
                WHERE id = %s
                RETURNING *
                """,
                (status, app_id)
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
                    'body': json.dumps({'error': 'Заявка не найдена'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()
