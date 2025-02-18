from flask import Flask,jsonify,render_template,request
import pymongo
from pymongo import MongoClient
import os
from flask_cors import CORS

#Constants are to be configred via ENv vars in later development stages
#Database integration constants
#MONGO_URL=str(os.getenv("MONGO_SERVER_URL"))# production
MONGO_URL="mongodb://localhost:27017"#testing
#SERVER constants
HOST = "127.0.0.1"
PORT = "7500"



server_obj = Flask(__name__)
CORS(server_obj)# Allowing CORS for all routes

#Routes
@server_obj.route("/")
def Homepage():
	return render_template("home.html")

# READ Routes
@server_obj.route("/api/read/all",methods =["GET"])
def getDBCOL():
	
	db=request.args.get("db")
	col=request.args.get("col")
	
	response={
	"status":None,
	"data":None
	}
	
	mongo_client = MongoClient(MONGO_URL)
	mongo_db_obj = mongo_client[db]
	mongo_col_obj = mongo_db_obj[col]
	
	response["data"] = list(mongo_col_obj.find({},{"_id":0}))
	
	if(not response["data"]):
		response["status"]=404
	else:
		response["status"]=200
	return jsonify(response)
	
@server_obj.route("/api/read/kv",methods=["GET"])
def getKV():
	
	db=request.args.get("db")
	col=request.args.get("col")
	key=request.args.get("key")
	value=request.args.get("value")
	response={
	"status":None,
	"data":None
	}
	mongo_client = MongoClient(MONGO_URL)
	mongo_db_obj = mongo_client[db]
	mongo_col_obj = mongo_db_obj[col]
	
	response["data"] = list(mongo_col_obj.find_one({key:value},{"_id":0}))
	
	if(not response["data"]):
		response["status"]=404
	else:
		response["status"]=200
	return jsonify(response)
	


if __name__ == "__main__":
	server_obj.run(debug=False,port=PORT, host= HOST)


