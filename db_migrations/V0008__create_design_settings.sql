-- Создаем таблицу для настроек позиций элементов
CREATE TABLE IF NOT EXISTS t_p56936631_application_admin_si.design_settings (
  id SERIAL PRIMARY KEY,
  element_key VARCHAR(100) UNIQUE NOT NULL,
  position_x INTEGER DEFAULT 0,
  position_y INTEGER DEFAULT 0,
  width INTEGER,
  height INTEGER,
  rotation INTEGER DEFAULT 0,
  scale DECIMAL(3,2) DEFAULT 1.0,
  z_index INTEGER DEFAULT 1,
  is_visible BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавляем начальные настройки для основных элементов
INSERT INTO t_p56936631_application_admin_si.design_settings (element_key, position_x, position_y, is_visible)
VALUES 
  ('pin_icon_size', 128, 12, true),
  ('hero_section', 0, 0, true),
  ('about_section', 0, 0, true),
  ('features_section', 0, 0, true),
  ('video_section', 0, 0, true),
  ('order_section', 0, 0, true),
  ('contact_section', 0, 0, true)
ON CONFLICT (element_key) DO NOTHING;
