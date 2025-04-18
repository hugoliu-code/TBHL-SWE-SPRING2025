from src.db_initialization import db
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