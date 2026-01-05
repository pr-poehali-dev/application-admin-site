-- Добавляем тексты для шагов заказа
INSERT INTO t_p56936631_application_admin_si.site_content (key, value, section, updated_at)
VALUES 
  ('order_step_1', 'Выберите масло из каталога', 'order', CURRENT_TIMESTAMP),
  ('order_step_2', 'Оставьте заявку на сайте', 'order', CURRENT_TIMESTAMP),
  ('order_step_3', 'Получите заказ с доставкой', 'order', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;
