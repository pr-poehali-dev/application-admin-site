-- Добавление поля hero_image для загрузки фото главного экрана
INSERT INTO t_p56936631_application_admin_si.site_content (key, value, section)
VALUES ('hero_image', '', 'hero')
ON CONFLICT (key) DO NOTHING;