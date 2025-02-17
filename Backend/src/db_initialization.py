import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os
# Use a service account.
cred = credentials.Certificate(os.path.join(os.path.dirname(__file__),"..","keys","firebase_cert.json"))

app = firebase_admin.initialize_app(cred)

db = firestore.client()
