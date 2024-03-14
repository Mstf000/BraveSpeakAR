from flask import Flask, render_template, url_for, request, session, redirect, jsonify
from flask_pymongo import PyMongo
from pymongo.errors import PyMongoError
import hashlib

app = Flask(__name__)
app.secret_key = 'mysecret'
app.config['MONGO_URI'] = 'mongodb+srv://mstf:mstf123@cluster0.pfzhwqr.mongodb.net/grad'
mongo = PyMongo(app)



@app.route('/getDocLogin', methods=['GET'])
def getDocLogin():
        return render_template('index.html', userType="doctor")

@app.route('/getPatientLogin', methods=['GET'])
def getPatientLogin():
        return render_template('index.html', userType="patient")

@app.route('/getDocRegister', methods=['GET'])
def getDocRegister():
        return render_template('register.html', userType="doctor")

@app.route('/getPatientRegister', methods=['GET'])
def getPatientRegister():
        return render_template('register.html', userType="patient")


@app.route('/')
def index():
    if 'username' in session:
        # If user is logged in, show test.html as the default page
        return render_template('test.html', username=session['username'])
    else:
        # If user is not logged in, show the login page
        return render_template('test.html')

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        if request.form["userType"]=='doctor':
            model = mongo.db.doctors
        else:
            model= mongo.db.users

        login_user = model.find_one({'name': request.form['username']})

        if login_user:
            input_password = hashlib.sha256(request.form['pass'].encode('utf-8')).hexdigest()
            if input_password == login_user['password']:
                session['username'] = request.form['username']
                if request.form["userType"] == 'doctor':
                    return redirect(url_for('dashboard'))  # Redirect to the homepage (graph.html) after login
                else:
                    return redirect(url_for('homepage'))  # Redirect to the homepage (graph.html) after login
        return 'Invalid username/password combination'
    else:
        return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        if request.form["userType"] == 'doctor':
            model = mongo.db.doctors
        else:
            model = mongo.db.users

        existing_user = model.find_one({'name': request.form['username']})

        if existing_user is None:
            hashpass = hashlib.sha256(request.form['pass'].encode('utf-8')).hexdigest()
            model.insert_one({'name': request.form['username'], 'password': hashpass})
            session['username'] = request.form['username']
            return redirect(url_for('homepage'))  # Redirect to the homepage (graph.html) after registration
        return 'That username already exists!'
    else:
        return render_template('register.html')



@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route('/homepage')
def homepage():
    if 'username' in session:
        # If user is logged in, render the graph.html page
        return render_template('graph.html', username=session['username'])
    else:
        # If user is not logged in, redirect them to the login page
        return redirect(url_for('login'))

@app.route('/upload')
def upload():
    if 'username' in session:
        # If user is logged in, render the graph.html page
        return render_template('videoUpload.html', username=session['username'])
    else:
        # If user is not logged in, redirect them to the login page
        return redirect(url_for('login'))

@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        # If user is logged in, render the graph.html page
        return render_template('dashboard.html', username=session['username'])
    else:
        # If user is not logged in, redirect them to the login page
        return redirect(url_for('login'))

@app.route('/add_user', methods=['POST'])
def add_user():
    users = mongo.db.users
    user = {
        'id': request.json.get('id', ''),
        'name': request.json.get('name', ''),
        'email': request.json.get('email', '')
    }
    try:
        result = users.insert_one(user)
        return jsonify({'msg': 'User added successfully', 'id': str(result.inserted_id)}), 201
    except PyMongoError as e:
        return jsonify({'error': 'Could not add user to the database', 'details': str(e)}), 500

@app.route('/get_users', methods=['GET'])
def get_users():
    try:
        users = list(mongo.db.users.find({}, {'_id': 0}))
        return jsonify(users)
    except PyMongoError as e:
        return jsonify({'error': 'Could not retrieve users from the database', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
