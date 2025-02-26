from flask import Flask, render_template, request, jsonify
import database

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

@app.route('/contacts', methods=['GET', 'POST'])
def contacts():
    if request.method == 'POST':
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
            return jsonify({'error': 'Внутрішня помилка сервера'}), 500
    else:
        return render_template('contacts.html')

if __name__ == '__main__':
    app.run(debug=True)