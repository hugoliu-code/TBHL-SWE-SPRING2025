from src.gpt_initialization import client
from src.db_access import get_exercises

import json

def get_stretch_routine(user_id, session_name):

    # return a formatted stretch plan, probably using some ChatGPT prompting
    """
    Example Return Value
    {"Stretch_count" : int,
    "Stretch0_name": string,
    "Stretch0_target: string,
    "Stretch0_time: int,
    ...
    }
    """
    # open file /keys/gptkey.json
    system_message = {
        "role": "system",
        "content": "You are a fitness expert. Your role is to create effective stretching routines that should be done after a workout given by the user. "
        "Provide a list of stretches that should be done after a workout is completed in order to promote recovery. "
        "Do not provide information about stretching before a workout and do not provide a workout routine. "
        "Don't give a warm-up routine or a workout."
        "Format this list where each stretch is divided into name, instructions, duration, and muscle group."
        "Format it as such: 'Name: [name]\nInstructions: [instructions]\n Duration: [duration]\nMuscle groups: [muscle group(s)]'"
        "Put it into a json file format, where 'stretches' will be a key to a list of dictionaries."
}

# user_workout = input("\nPlease enter your workout routine:\n")
    user_workout = get_exercises(user_id, session_name)
    exercise_string = ""
    for exercise in user_workout:
        exercise_string += "Exercise :" + exercise + "\n"


    messages = [
        system_message,
        {
            "role": "user",
            "content": exercise_string
        }
    ]

    response = client.chat.completions.create(
        model = "gpt-4o-mini",
        messages = messages
    )

    stretches = response.choices[0].message.content


    if stretches.strip().startswith("```json"):
        stretches = stretches.strip()[7:-3].strip()

    stretches_data = json.loads(stretches)
    stretch_plan = {"Stretch_count" : len(stretches_data["stretches"])}
    stretch_plan.update(stretches_data)

    return stretch_plan
