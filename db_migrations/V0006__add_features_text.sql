-- Добавляем тексты для особенностей
INSERT INTO t_p56936631_application_admin_si.site_content (key, value, section, updated_at)
VALUES 
  ('feature_1', 'Ручной отжим', 'features', CURRENT_TIMESTAMP),
  ('feature_2', 'Натуральные ингредиенты', 'features', CURRENT_TIMESTAMP),
  ('feature_3', 'Семейные традиции', 'features', CURRENT_TIMESTAMP),
  ('feature_4', 'Без примесей', 'features', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;
