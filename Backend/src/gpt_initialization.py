import os
import openai
from openai import OpenAI
import json


with open(os.path.join(os.path.dirname(__file__),"..","keys","gptkey.json")) as f:
    data = json.load(f)
client = openai.OpenAI(api_key = data["api_key"])