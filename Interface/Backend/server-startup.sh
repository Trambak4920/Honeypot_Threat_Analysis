#!/bin/bash

# Mongo Link
export MONGO_SERVER_URL="mongodb://127.0.0.1:27017/" # change according to needs, 127.0.0.1 for local
export CRED_DB="cred"
export CRED_DB_USERCOL="userCred"
# Gunicorn Configuration
export API_SUB_PROCESSES="4" # ( 2 * CPU cores of host hardware)+1
export API_THREADS=2 # each sub process threads (MIN 1)
export API_TIMEOUT=30 # in seconds
export API_PORT=8080

# Python Necessities
export VENV_PATH="./I-venv/bin/activate" # Full path to the python virtual env with the required dependencies
export SERVER_PATH="api-server-src.api-server" # Path to the 'api-server.py' WITHOUT THE .py EXTENSION AND WITH . INSTEAD OF '/'

echo -e "Current Configurations:\n\nDATABASE_SERVER_URL:$MONGO_SERVER_URL\nCRED_DB:$CRED_DB\nCRED_DB_USERCOL:$CRED_DB_USERCOL\n\nAPI_SUB_PROCESSESS:$API_SUB_PROCESSES\nAPI_THREADS:$API_THREADS\nAPI_TIMEOUT:$API_TIMEOUT\nAPI_PORT:$API_PORT\n\nVENV_PATH:$VENV_PATH\nSERVER_PATH:$SERVER_PATH"

echo -e "\n\nRun API server with the following dependencies and configurations?[1/0]:"
read choice
if [ $choice != 1 ]; then
	exit
else
	echo "Sourcing virtual environment..."
	source $VENV_PATH|| { echo "Failed to source virtual environment"; exit 1; }
	echo "Running server in gunicorn with the above configuration..."
	gunicorn --bind 0.0.0.0:$API_PORT --timeout $API_TIMEOUT --workers $API_SUB_PROCESSES --threads $API_THREADS $SERVER_PATH:server_obj
	deactivate


fi
