-- Создание таблицы для категорий масел
CREATE TABLE IF NOT EXISTS t_p56936631_application_admin_si.oil_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для масел
CREATE TABLE IF NOT EXISTS t_p56936631_application_admin_si.oils (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    emoji VARCHAR(10) NOT NULL DEFAULT '🌾',
    category_slug VARCHAR(255) NOT NULL,
    description TEXT,
    audio_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка начальных категорий
INSERT INTO t_p56936631_application_admin_si.oil_categories (name, slug) VALUES
('Ореховые масла', 'ореховые'),
('Семенные масла', 'семенные')
ON CONFLICT (slug) DO NOTHING;

-- Вставка начальных масел
INSERT INTO t_p56936631_application_admin_si.oils (name, emoji, category_slug, description, audio_url) VALUES
('Масло кедрового ореха', '🌰', 'ореховые', 'Насыщенный аромат с ореховыми нотами', ''),
('Масло грецкого ореха', '🥜', 'ореховые', 'Мягкий вкус с легкой горчинкой', ''),
('Льняное масло', '🌾', 'семенные', 'Богатое омега-3 кислотами', ''),
('Тыквенное масло', '🎃', 'семенные', 'Глубокий вкус с пикантными нотами', ''),
('Подсолнечное масло', '🌻', 'семенные', 'Классический вкус для любых блюд', ''),
('Масло фундука', '🥥', 'ореховые', 'Нежный ореховый вкус', '');