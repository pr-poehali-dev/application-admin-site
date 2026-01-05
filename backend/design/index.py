import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """
    API для управления настройками дизайна элементов.
    GET - получить все настройки
    PUT - обновить настройки элемента
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    dsn = os.environ['DATABASE_URL']
    
    if method == 'GET':
        try:
            with psycopg2.connect(dsn) as conn:
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("""
                        SELECT element_key, position_x, position_y, width, height,
                               rotation, scale, z_index, is_visible
                        FROM t_p56936631_application_admin_si.design_settings
                    """)
                    settings = cur.fetchall()
            
            result = {}
            for setting in settings:
                result[setting['element_key']] = {
                    'position_x': setting['position_x'],
                    'position_y': setting['position_y'],
                    'width': setting['width'],
                    'height': setting['height'],
                    'rotation': setting['rotation'],
                    'scale': float(setting['scale']) if setting['scale'] else 1.0,
                    'z_index': setting['z_index'],
                    'is_visible': setting['is_visible']
                }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result)
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
    
    elif method == 'PUT':
        try:
            body = json.loads(event.get('body', '{}'))
            element_key = body.get('element_key')
            
            if not element_key:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'element_key is required'})
                }
            
            with psycopg2.connect(dsn) as conn:
                with conn.cursor() as cur:
                    cur.execute("""
                        INSERT INTO t_p56936631_application_admin_si.design_settings 
                        (element_key, position_x, position_y, width, height, rotation, scale, z_index, is_visible)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        ON CONFLICT (element_key) 
                        DO UPDATE SET 
                            position_x = EXCLUDED.position_x,
                            position_y = EXCLUDED.position_y,
                            width = EXCLUDED.width,
                            height = EXCLUDED.height,
                            rotation = EXCLUDED.rotation,
                            scale = EXCLUDED.scale,
                            z_index = EXCLUDED.z_index,
                            is_visible = EXCLUDED.is_visible,
                            updated_at = CURRENT_TIMESTAMP
                    """, (
                        element_key,
                        body.get('position_x', 0),
                        body.get('position_y', 0),
                        body.get('width'),
                        body.get('height'),
                        body.get('rotation', 0),
                        body.get('scale', 1.0),
                        body.get('z_index', 1),
                        body.get('is_visible', True)
                    ))
                    conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True})
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
        'body': json.dumps({'error': 'Method not allowed'})
    }
