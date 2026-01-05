import bcrypt

# Хеш из базы
hash_from_db = "$2b$10$vXZKj3qN7Y.HJKqZ9xKzuOZYqR1J3tZ.qL7YsF8XQ.VxB5KJqU8bm"

# Проверяем пароль
password = "2467135p!"
result = bcrypt.checkpw(password.encode('utf-8'), hash_from_db.encode('utf-8'))
print(f"Password check result: {result}")

# Создаем новый хеш для пароля
new_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
print(f"New hash: {new_hash.decode('utf-8')}")
