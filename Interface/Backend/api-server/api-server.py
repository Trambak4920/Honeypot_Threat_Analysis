from flask import Flask,jsonify,render_template
import pymongo
from pymongo import MongoClient


#Constants are to be configred via ENv vars in later development stages
#Database integration constants
MONGO_URL="mongodb://127.0.0.1:27017/"

#SERVER constants
HOST = "127.0.0.1"
PORT = "7500"



server_obj = Flask(__name__)

#Routes
@server_obj.route("/")
def Homepage():
	return render_template("home.html")

# READ Routes
@server_obj.route("/api/read/<string:db>/<string:col>",methods =["GET"])
def getDBCOL(db,col):
	mongo_client = MongoClient(MONGO_URL)
	mongo_db_obj = mongo_client[db]
	mongo_col_obj = mongo_db_obj[col]
	data = list(mongo_col_obj.find({},{"_id":0}))
	if(not data):
		return jsonify({"error":"NOT FOUND"})
	return jsonify(data)
@server_obj.route("/api/read/<string:db>/<string:col>/<string:key>/<string:value>",methods=["GET"])
def getKV(db,col,key,value):
	mongo_client = MongoClient(MONGO_URL)
	mongo_db_obj = mongo_client[db]
	mongo_col_obj = mongo_db_obj[col]
	data = list(mongo_col_obj.find_one({key:value},{"_id":0}))
	if(not data):
		return jsonify({"error":"NOT FOUND"})
	return jsonify(data)
	


if __name__ == "__main__":
	server_obj.run(debug=False,port=PORT, host= HOST)


