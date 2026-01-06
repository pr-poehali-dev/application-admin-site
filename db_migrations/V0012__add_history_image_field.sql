-- Добавление поля history_image для фото секции истории
INSERT INTO t_p56936631_application_admin_si.site_content (key, value, section)
VALUES ('history_image', '', 'history')
ON CONFLICT (key) DO NOTHING;