import psycopg2
from psycopg2 import Error

def connect_to_database():
    try:
        connection = psycopg2.connect(
            "postgresql://neondb_owner:npg_vy3z9OSFdeIB@ep-tight-dust-a9vcpxty-pooler.gwc.azure.neon.tech/neondb?sslmode=require"
        )
        print("Успішно підключено до бази даних!")
        return connection
    except Error as e:
        print(f"Помилка при підключенні до бази даних: {e}")
        return None

def save_message(name, email, message):
    connection = connect_to_database()
    if connection is not None:
        try:
            cursor = connection.cursor()
            insert_query = """
                INSERT INTO messages (name, email, message, read)
                VALUES (%s, %s, %s, false)
            """
            cursor.execute(insert_query, (name, email, message))
            connection.commit()
            print("Повідомлення успішно збережено!")
        except Error as e:
            print(f"Помилка при збереженні повідомлення: {e}")
        finally:
            if connection:
                cursor.close()
                connection.close()
    else:
        print("Не вдалося підключитися до бази даних!")

if __name__ == "__main__":
    save_message("Тест", "test@example.com", "Тестове повідомлення")