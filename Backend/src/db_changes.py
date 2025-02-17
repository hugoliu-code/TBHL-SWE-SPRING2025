from src.db_initialization import db
from src.gpt_query import generate_stretch_plan
from src.db_access import get_exercises
from firebase_admin import firestore

def create_new_user(UID: str) -> None:
    # create a new collection with a default 
    blank_session = {"Stretches": {"Stretch_count" : 0}, "Exercises" : []}
    db.collection(UID).document("My First Session").set(blank_session)

def create_session(UID: str, session_name: str) -> None:
    # create a session with the name session_name
    blank_session = {"Stretches": {"Stretch_count" : 0}, "Exercises" : []}
    db.collection(UID).document(session_name).set(blank_session)

def add_exercise(UID: str, session_name: str, exercise_name: str) -> None:
    # add a single exercise string to the existing exercises
    db.collection(UID).document(session_name).update({"Exercises": firestore.ArrayUnion([exercise_name])})

def create_stretch_plan(UID: str, session_name: str) -> None:
    # Generate a plan using chatgpt using the existing exercises, and return a dict
    stretch_plan = generate_stretch_plan(get_exercises(UID, session_name))
    db.collection(UID).document(session_name).update({"Stretches": stretch_plan})

    
add_exercise("TestUser1", "Session2", "Lat Pulldown 2")
    
