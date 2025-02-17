from src.db_initialization import db

def get_sessions(UID: str) -> list[str]:
    # return all sessions under a user
    
    user_ref = db.collection(UID)
    docs = user_ref.stream()

    result = [doc.id for doc in docs]

    return result

def get_exercises(UID: str, session_name) -> list[str]:
    # return a list of exercises under a session name
    user_ref = db.collection(UID).document(session_name)
    doc = user_ref.get()
    return doc.to_dict()["Exercises"]

def get_stretch_routine(UID: str, session_name) -> dict:
    # return a dictionary representing a stretch routine
    user_ref = db.collection(UID).document(session_name)
    doc = user_ref.get()
    return doc.to_dict()["Stretches"]