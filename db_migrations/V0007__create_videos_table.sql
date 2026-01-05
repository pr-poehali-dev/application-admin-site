-- Создаем таблицу для видео
CREATE TABLE IF NOT EXISTS t_p56936631_application_admin_si.videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  duration VARCHAR(20),
  views INTEGER DEFAULT 0,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавляем тестовые видео
INSERT INTO t_p56936631_application_admin_si.videos (title, description, video_url, thumbnail_url, duration, views)
VALUES 
  ('Как мы делаем яблочный сок', 'Процесс приготовления натурального яблочного сока от сбора урожая до готового продукта', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400', '5:23', 1245),
  ('Секреты ручного отжима', 'Рассказываем о технологии традиционного ручного отжима сока', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', '3:47', 892),
  ('Обзор нашего сада', 'Экскурсия по яблоневому саду, где растут наши фрукты', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1537808288253-934cce4e0fa7?w=400', '7:12', 2134),
  ('Семейные традиции производства', 'История нашей семьи и традиции приготовления сока', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=400', '4:35', 1567),
  ('Упаковка и доставка', 'Как мы бережно упаковываем и доставляем сок нашим клиентам', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400', '2:58', 743),
  ('Отзывы наших клиентов', 'Что говорят люди, которые попробовали наш натуральный сок', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400', '6:41', 1891);
