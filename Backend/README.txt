Running/Testing Backend

Make sure all requirements are installed for python or a python venv
pip install -r /path/to/requirements.txt

cd into backend directory and run flask with debugging turned on
- cd backend
- flask run --debug --port 5000


KNOWN PROBLEMS
Installing firebase-admin error building wheels

If having errors installing firebase-admin, specifically the cryptography and grpcio dependencies, try the following
- Make sure using python version 3.11.9 or above
- Clear pip cache

If those don't work, the following should
- Use python version 3.11.9
- In the root of project, create a virtual environment
    - in VSCode: navigate to any .py file -> click the python version that appears in the bottom right -> click "Create Virtual Environment" in dropdown from above -> run ./.venv/Scripts/Activate.ps1 in terminal
    - in General: python -m venv .venv
        - Make sure the venv is in 3.11.9
- Install with pip
    - pip install -r /path/to/requirements.txt
- cd backend
- flask run --debug --port 5000


Certifications
    You MAY be missing the firebase certification file, (if not given to you in zip file)
    contact Hugo Liu so he can send it to you. We can't store it on github because
    it will be detected as compromised and deleted.
    
    Once you get the file, make sure it is named "firebase_cert.json", and put
    it in the "keys" directory.

    You MAY be missing the ChatGPT key, (if not given to you in zip file)
    contact Hugo Liu or Thomas Alvarado so he can send it to you. We can't store it on github because
    it will be detected as compromised and deleted.

    Once you get the ChatGPT key, make sure it is stored in a new file called "gptkey.json", 
    and put it in the "keys" directory.
