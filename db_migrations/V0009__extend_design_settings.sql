-- Расширяем таблицу настроек дизайна
ALTER TABLE t_p56936631_application_admin_si.design_settings 
ADD COLUMN IF NOT EXISTS margin_left INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS margin_right INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS margin_top INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS margin_bottom INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS padding_left INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS padding_right INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS padding_top INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS padding_bottom INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS font_size INTEGER,
ADD COLUMN IF NOT EXISTS line_height DECIMAL(3,2);

-- Добавляем настройки для всех текстовых и визуальных элементов
INSERT INTO t_p56936631_application_admin_si.design_settings (element_key, position_x, position_y, is_visible)
VALUES 
  ('hero_title', 0, 0, true),
  ('hero_description', 0, 0, true),
  ('section_titles', 48, 0, true),
  ('section_text', 16, 0, true),
  ('feature_cards', 0, 0, true),
  ('video_cards', 0, 0, true),
  ('order_cards', 0, 0, true),
  ('contact_form', 0, 0, true),
  ('buttons', 0, 0, true),
  ('white_cards', 0, 0, true)
ON CONFLICT (element_key) DO NOTHING;
