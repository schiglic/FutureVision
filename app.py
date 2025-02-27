from flask import Flask, render_template, request, jsonify
import database  # Імпортуй модуль database.py

app = Flask(__name__)

@app.route('/')
def show_home():
    return render_template('index.html')

@app.route('/space')
def show_space():
    return render_template('space.html')

@app.route('/artificial')
def show_artificial():
    return render_template('artificial.html')

@app.route('/contacts')
def show_contacts():
    return render_template('contacts.html')

@app.route('/save-message', methods=['POST'])
def save_message():
    try:
        # Отримуємо дані з JSON (оскільки JavaScript відправляє JSON)
        data = request.get_json()
        if not data or 'name' not in data or 'email' not in data or 'message' not in data:
            return jsonify({'error': 'Відсутні дані name, email або message'}), 400

        name = data['name']
        email = data['email']
        message = data['message']
        
        # Збереження в базу даних
        database.save_message(name, email, message)
        return jsonify({'message': 'Повідомлення успішно збережено!'})
    except Exception as e:
        print(f"Помилка на сервері: {e}")
        return jsonify({'error': 'Сталася помилка на сервері'}), 500

if __name__ == '__main__':
    app.run(debug=True)