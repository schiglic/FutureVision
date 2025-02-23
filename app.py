from flask import Flask, request, jsonify, render_template
import database  # Імпортуй модуль database.py

app = Flask(__name__)

# Маршрут для відображення сторінки contacts.html
@app.route('/')
def show_contacts():
    return render_template('contacts.html')

# Маршрут для збереження повідомлення
@app.route('/save-message', methods=['POST'])
def save_message_route():
    try:
        data = request.get_json()
        if not data or 'name' not in data or 'email' not in data or 'message' not in data:
            return jsonify({'error': 'Відсутні дані name, email або message'}), 400

        name = data['name']
        email = data['email']
        message = data['message']
        
        database.save_message(name, email, message)
        return jsonify({'message': 'Повідомлення успішно збережено!'})
    except Exception as e:
        print(f"Помилка на сервері: {e}")
        return jsonify({'error': 'Сталася помилка на сервері'}), 500

if __name__ == '__main__':
    app.run(debug=True)