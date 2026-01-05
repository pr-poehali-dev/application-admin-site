-- Добавляем видео в контент
INSERT INTO t_p56936631_application_admin_si.site_content (key, value, section, updated_at)
VALUES 
  ('video_main', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'video', CURRENT_TIMESTAMP),
  ('video_1', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'video', CURRENT_TIMESTAMP),
  ('video_2', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'video', CURRENT_TIMESTAMP),
  ('video_3', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'video', CURRENT_TIMESTAMP),
  ('video_4', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'video', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;
