from flask import Flask, request, jsonify
from src.db_access import get_sessions, get_exercises, get_stretch_routine
from src.db_changes import create_new_user, create_session, create_stretch_plan, add_exercise
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/create_new_user", methods = ["POST"])
def create_new_user_endpoint():
    data = request.json
    try:
        create_new_user(data["UID"])
        return jsonify({"response": "success"}), 200
    except:
        return jsonify({"response": "Something went wrong"}), 400

@app.route("/create_session", methods = ["GET"])
def create_session_endpoint():
    data = request.json
    try:
        create_session(data["UID"], data["session_name"])
        return jsonify({"response": "success"}), 200
    except:
        return jsonify({"response": "Something went wrong"}), 400


@app.route("/add_exercise", methods = ["POST"])
def add_exercise_endpoint():
    data = request.json
    try:
        add_exercise(data["UID"], data["session_name"], data["exercise_name"])
        return jsonify({"response": "success"}), 200
    except:
        return jsonify({"response": "Something went wrong"}), 400

@app.route("/create_stretch_plan", methods = ["GET"])
def create_stretch_plan_endpoint():
    data = request.json
    try:
        create_stretch_plan(data["UID"], data["session_name"])
        return jsonify({"response": "success"}), 200
    except:
        return jsonify({"response": "Something went wrong"}), 400


@app.route("/get_sessions", methods = ["GET", "POST"])
def get_sessions_endpoint():
    data = request.json
    try:
        sessions = get_sessions(data["UID"])
        return jsonify({"response": "success", "sessions": sessions}), 200
    except:
        return jsonify({"response": "Something went wrong"}), 400

@app.route("/get_exercises", methods = ["GET"])
def get_exercises_endpoint():
    data = request.json
    try:
        exercises = get_exercises(data["UID"], data["session_name"])
        return jsonify({"response": "success", "exercises": exercises}), 200
    except:
        return jsonify({"response": "Something went wrong"}), 400


@app.route("/get_stretch_routine", methods = ["GET"])
def get_stretch_routine_endpoint():
    data = request.json
    try:
        routine = get_stretch_routine(data["UID"], data["session_name"])
        return jsonify({"response": "success", "routine" : routine}), 200
    except:
        return jsonify({"response": "Something went wrong"}), 400



