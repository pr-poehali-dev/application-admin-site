-- Создание таблицы для пользователей админпанели
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для текстового контента сайта
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  section VARCHAR(50),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для заявок
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  message TEXT,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка администратора (пароль захеширован с bcrypt)
INSERT INTO admins (email, password_hash) 
VALUES ('pavellubov312@gmail.com', '$2b$10$vXZKj3qN7Y.HJKqZ9xKzuOZYqR1J3tZ.qL7YsF8XQ.VxB5KJqU8bm')
ON CONFLICT (email) DO NOTHING;

-- Вставка начального контента
INSERT INTO site_content (key, value, section) VALUES
('hero_title', 'Яворский Дворъ Масел', 'hero'),
('hero_description', 'Сыродавленное масло ручной работы. Без лишних примесей, только целебные орехи и семена, отжатые вручную с заботой и вкусе и пользе.', 'hero'),
('history_title', 'История нашего бренда', 'about'),
('history_subtitle', 'Яворский Дворъ Масел — дань Роду. Память, которая оживает в каждом продукте', 'about'),
('features_title', 'В чём наша особенность?', 'features'),
('features_subtitle', 'Когда вы приходитесь к продуктам Яворского Двора Масел, вы прикасаетесь к истории рода, восстановленной с честью', 'features')
ON CONFLICT (key) DO NOTHING;
