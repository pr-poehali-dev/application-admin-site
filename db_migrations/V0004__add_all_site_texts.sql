-- Добавляем все остальные тексты с сайта
INSERT INTO t_p56936631_application_admin_si.site_content (key, value, section, updated_at)
VALUES 
  -- История
  ('history_text_1', 'Яворский Дворъ Масел создаёт в честь рода моего деда. Яворского Константина. В тяжёлые послевоенные времена мои дети не могли носить его фамилию. Сегодня имя возвращено с честью.', 'about', CURRENT_TIMESTAMP),
  ('history_text_2', 'Возрождаем связь поколений через ремесло. Каждый продукт — это познание традиций, воплощённые в живых маслах и традиционных формах. Это почтение Роду и возвращение родовой силы в повседневность.', 'about', CURRENT_TIMESTAMP),
  
  -- Видео секция
  ('video_section_title', 'Как мы создаем наше масло?', 'video', CURRENT_TIMESTAMP),
  ('video_section_subtitle', 'Посмотрите весь путь — от натуральных орехов и семян до густого, ароматного масла сыродавленного о масла в вашей тарелке.', 'video', CURRENT_TIMESTAMP),
  
  -- Как заказать
  ('order_title', 'Как заказать?', 'order', CURRENT_TIMESTAMP),
  ('order_subtitle', 'Сыродавленное масло ручной работы. Без лишних примесей, только целебные орехи и семена, отжатые вручную с заботой о вкусе и пользе.', 'order', CURRENT_TIMESTAMP),
  
  -- Форма заявки
  ('contact_title', 'Оставить заявку', 'contact', CURRENT_TIMESTAMP),
  ('contact_subtitle', 'Сыродавленное масло ручной работы. Без лишних примесей, только целебные орехи и семена, отжатые вручную с заботой о вкусе и пользе.', 'contact', CURRENT_TIMESTAMP),
  
  -- Кнопки
  ('btn_catalog', 'Скачать каталог (PDF)', 'buttons', CURRENT_TIMESTAMP),
  ('btn_video', 'Смотреть видео', 'buttons', CURRENT_TIMESTAMP),
  ('btn_submit', 'Оставить заявку', 'buttons', CURRENT_TIMESTAMP),
  
  -- Навигация
  ('nav_catalog', 'Каталог', 'navigation', CURRENT_TIMESTAMP),
  ('nav_video', 'Видео', 'navigation', CURRENT_TIMESTAMP),
  ('nav_contacts', 'Контакты', 'navigation', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;
