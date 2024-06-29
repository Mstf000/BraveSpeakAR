from flask import Flask, request, session, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.json_util import dumps
from pymongo.errors import PyMongoError
import hashlib
#so far so good 22/3/2024
app = Flask(__name__)
app.secret_key = 'mysecret'
app.config['MONGO_URI'] = 'mongodb+srv://mstf:mstf123@cluster0.pfzhwqr.mongodb.net/grad'
mongo = PyMongo(app)
CORS(app)  # Enable CORS for all domains on all routes

@app.route('/login', methods=['POST'])
def login():
    users = mongo.db.users  # Assuming 'users' collection for simplicity
    username = request.json.get('username')
    password = request.json.get('password')
    userType = request.json.get('userType')

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    model = mongo.db.doctors if userType == 'doctor' else users
    user = model.find_one({'username': username})

    if user:
        input_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        if input_password == user['password']:
            session['username'] = username
            return jsonify({"message": "Login successful", "username": username}), 200
        else:
            return jsonify({"error": "Invalid username/password combination"}), 401
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/register', methods=['POST'])
def register():
    users = mongo.db.users  # Assuming 'users' collection for simplicity
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    userType = request.json.get('userType')

    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400

    # Determine the correct collection based on userType
    model = mongo.db.doctors if userType == 'doctor' else users
    existing_user = model.find_one({'username': username})

    if existing_user is None:
        hashpass = hashlib.sha256(password.encode('utf-8')).hexdigest()

        # Fetch the next user ID based on the collection
        next_id = get_next_sequence('user')  # Use 'doctor' if userType is doctor

        # Insert the new user with the auto-increment ID
        user_id = model.insert_one({
            'id': next_id,  # Store the auto-incremented ID
            'username': username,
            'password': hashpass,
            'email': email
        }).inserted_id

        session['username'] = username
        return jsonify({
            "message": "User registered successfully",
            "username": username,
            "id": str(user_id),
            "autoIncrementID": next_id  # You might want to return this as well
        }), 201
    else:
        return jsonify({"error": "Username already exists"}), 409

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({"message": "Logged out successfully"}), 200

@app.route('/add_user', methods=['POST'])
def add_user():
    users = mongo.db.users
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')

    # Generate hashed password
    hashpass = hashlib.sha256(password.encode('utf-8')).hexdigest()

    # Fetch the next user ID
    next_id = get_next_sequence('user')  # Make sure 'user' aligns with your naming convention

    # Prepare user document including the new auto-increment ID
    user = {
        'id': next_id,  # Add the auto-increment ID
        'username': username,
        'email': email,
        'password': hashpass
    }

    try:
        # Insert new user with auto-increment ID
        result = users.insert_one(user)
        return jsonify({'msg': 'User added successfully', 'id': str(result.inserted_id), 'autoIncrementID': next_id}), 201
    except PyMongoError as e:
        return jsonify({'error': 'Could not add user to the database', 'details': str(e)}), 500

@app.route('/get_users', methods=['GET'])
def get_users():
    try:
        users = list(mongo.db.users.find({}, {'_id': 0}))
        return jsonify(users)
    except PyMongoError as e:
        return jsonify({'error': 'Could not retrieve users from the database', 'details': str(e)}), 500

@app.route('/get_score/<username>', methods=['GET'])
def get_score(username):
    user_collection = mongo.db.users  # Assuming you store user scores in the 'users' collection
    user = user_collection.find_one({"username": username})
    if user:
        return jsonify({"username": username, "score": user.get("score", 0)}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/get_voice/<username>', methods=['GET'])
def get_voice(username):
    user_collection = mongo.db.users  # Assuming you store user scores in the 'users' collection
    user = user_collection.find_one({"username": username})
    if user:
        return jsonify({"username": username, "voice": user.get("voice", 0)}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/get_movements/<username>', methods=['GET'])
def get_movements(username):
    user_collection = mongo.db.users  # Assuming you store user scores in the 'users' collection
    user = user_collection.find_one({"username": username})
    if user:
        return jsonify({"username": username, "movements": user.get("movements", 0)}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@app.route('/get_emotions/<username>', methods=['GET'])
def get_emotions(username):
    user_collection = mongo.db.users  # Assuming you store user scores in the 'users' collection
    user = user_collection.find_one({"username": username})
    if user:
        return jsonify({"username": username, "emotions": user.get("emotions", 0)}), 200
    else:
        return jsonify({"error": "User not found"}), 404



def get_next_sequence(collection_name):
    db = mongo.db
    sequence_document = db.counters.find_one_and_update(
        {'_id': collection_name},
        {'$inc': {'seq': 1}},
        upsert=True,
        return_document=True
    )
    return sequence_document['seq']



if __name__ == '__main__':
    app.run(debug=True)



# after grad modifications 2





# from flask import Flask, render_template, url_for, request, session, redirect, jsonify
# from flask_pymongo import PyMongo
# from pymongo.errors import PyMongoError
# import hashlib
#
# app = Flask(__name__)
# app.secret_key = 'mysecret'
# app.config['MONGO_URI'] = 'mongodb+srv://mstf:mstf123@cluster0.pfzhwqr.mongodb.net/grad'
# mongo = PyMongo(app)
#
#
#
# @app.route('/getDocLogin', methods=['GET'])
# def getDocLogin():
#         return render_template('index.html', userType="doctor")
#
# @app.route('/getPatientLogin', methods=['GET'])
# def getPatientLogin():
#         return render_template('index.html', userType="patient")
#
# @app.route('/getDocRegister', methods=['GET'])
# def getDocRegister():
#         return render_template('register.html', userType="doctor")
#
# @app.route('/getPatientRegister', methods=['GET'])
# def getPatientRegister():
#         return render_template('register.html', userType="patient")
#
#
# @app.route('/')
# def index():
#     if 'username' in session:
#         # If user is logged in, show test.html as the default page
#         return render_template('test.html', username=session['username'])
#     else:
#         # If user is not logged in, show the login page
#         return render_template('test.html')
#
# @app.route('/login', methods=['POST'])
# def login():
#     if request.method == 'POST':
#         if request.form["userType"]=='doctor':
#             model = mongo.db.doctors
#         else:
#             model= mongo.db.users
#
#         login_user = model.find_one({'name': request.form['username']})
#
#         if login_user:
#             input_password = hashlib.sha256(request.form['pass'].encode('utf-8')).hexdigest()
#             if input_password == login_user['password']:
#                 session['username'] = request.form['username']
#                 if request.form["userType"] == 'doctor':
#                     return redirect(url_for('dashboard'))  # Redirect to the homepage (graph.html) after login
#                 else:
#                     return redirect(url_for('homepage'))  # Redirect to the homepage (graph.html) after login
#         return 'Invalid username/password combination'
#     else:
#         return render_template('index.html')
#
# @app.route('/register', methods=['POST'])
# def register():
#     if request.method == 'POST':
#         if request.form["userType"] == 'doctor':
#             model = mongo.db.doctors
#         else:
#             model = mongo.db.users
#
#         existing_user = model.find_one({'name': request.form['username']})
#
#         if existing_user is None:
#             hashpass = hashlib.sha256(request.form['pass'].encode('utf-8')).hexdigest()
#             model.insert_one({'name': request.form['username'], 'password': hashpass})
#             session['username'] = request.form['username']
#             return redirect(url_for('homepage'))  # Redirect to the homepage (graph.html) after registration
#         return 'That username already exists!'
#     else:
#         return render_template('register.html')
#
#
#
# @app.route('/logout')
# def logout():
#     session.clear()
#     return redirect(url_for('index'))
#
# @app.route('/homepage')
# def homepage():
#     if 'username' in session:
#         # If user is logged in, render the graph.html page
#         return render_template('graph.html', username=session['username'])
#     else:
#         # If user is not logged in, redirect them to the login page
#         return redirect(url_for('login'))
#
# @app.route('/upload')
# def upload():
#     if 'username' in session:
#         # If user is logged in, render the graph.html page
#         return render_template('videoUpload.html', username=session['username'])
#     else:
#         # If user is not logged in, redirect them to the login page
#         return redirect(url_for('login'))
#
# @app.route('/dashboard')
# def dashboard():
#     if 'username' in session:
#         # If user is logged in, render the graph.html page
#         return render_template('dashboard.html', username=session['username'])
#     else:
#         # If user is not logged in, redirect them to the login page
#         return redirect(url_for('login'))
#
# @app.route('/add_user', methods=['POST'])
# def add_user():
#     users = mongo.db.users
#     user = {
#         'id': request.json.get('id', ''),
#         'name': request.json.get('name', ''),
#         'email': request.json.get('email', '')
#     }
#     try:
#         result = users.insert_one(user)
#         return jsonify({'msg': 'User added successfully', 'id': str(result.inserted_id)}), 201
#     except PyMongoError as e:
#         return jsonify({'error': 'Could not add user to the database', 'details': str(e)}), 500
#
# @app.route('/get_users', methods=['GET'])
# def get_users():
#     try:
#         users = list(mongo.db.users.find({}, {'_id': 0}))
#         return jsonify(users)
#     except PyMongoError as e:
#         return jsonify({'error': 'Could not retrieve users from the database', 'details': str(e)}), 500
#
# if __name__ == '__main__':
#     app.run(debug=True)
