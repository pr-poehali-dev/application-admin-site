-- Обновляем пароль администратора
UPDATE t_p56936631_application_admin_si.admins 
SET password_hash = '$2b$12$8Zo9y7c6mWGEHRnYxKFOJOhLMdJ0XU5N5qE.Y2Zs5bYxH3wGvNGNO'
WHERE email = 'pavellubov312@gmail.com';
