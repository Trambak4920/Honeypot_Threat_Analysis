# Only use when initially setting up credentials database that is used for authentication
from pymongo import MongoClient
import bcrypt
#Requirements
# Mongodb running on the url 
# This script must have required permissions
MONGO_URL =  "mongodb://localhost:27017/"
AUTH_DB = "cred"
USER_COL="userCred"

mongo_client = MongoClient(MONGO_URL)

db=mongo_client[AUTH_DB]
col=db[USER_COL]

default_cred={
	"username":"user1",
	"password":"password"
} 

existing_rec = col.find_one({"username": default_cred["username"]})
if(existing_rec):
	print("Entry with default username exists")
else:
	print("WARNING: DEFAULT CREDENTIAL CREATED, IMMEDIATELY REVIEW DATABASE FOR SECURITY.")
	print(default_cred)
	default_cred["password"]=bcrypt.hashpw(default_cred["password"].encode("utf-8"),bcrypt.gensalt())
	col.insert_one(default_cred)
	
	


