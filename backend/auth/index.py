import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context):
    '''API для авторизации администратора'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method == 'POST':
        try:
            body_str = event.get('body', '{}')
            if not body_str or body_str.strip() == '':
                body_str = '{}'
            body = json.loads(body_str)
            email = body.get('email')
            
            if not email:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Email обязателен'})
                }
            
            conn = psycopg2.connect(os.environ['DATABASE_URL'])
            cur = conn.cursor(cursor_factory=RealDictCursor)
            
            cur.execute(
                f"SELECT * FROM {os.environ['MAIN_DB_SCHEMA']}.admins WHERE email = %s",
                (email,)
            )
            admin = cur.fetchone()
            
            cur.close()
            conn.close()
            
            if not admin:
                return {
                    'statusCode': 401,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Email не найден'})
                }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'admin': {
                        'id': admin['id'],
                        'email': admin['email']
                    }
                })
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e)})
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Метод не поддерживается'})
    }