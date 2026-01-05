import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """
    API для работы с видео контентом.
    Возвращает список видео из базы данных.
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'GET':
        try:
            dsn = os.environ['DATABASE_URL']
            
            with psycopg2.connect(dsn) as conn:
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("""
                        SELECT id, title, description, video_url, thumbnail_url, 
                               duration, views, published_at, is_active
                        FROM t_p56936631_application_admin_si.videos
                        WHERE is_active = true
                        ORDER BY published_at DESC
                    """)
                    videos = cur.fetchall()
            
            videos_list = []
            for video in videos:
                videos_list.append({
                    'id': video['id'],
                    'title': video['title'],
                    'description': video['description'],
                    'video_url': video['video_url'],
                    'thumbnail_url': video['thumbnail_url'],
                    'duration': video['duration'],
                    'views': video['views'],
                    'published_at': video['published_at'].isoformat() if video['published_at'] else None
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(videos_list)
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
