# Interface Structure and Functionality

## Structure
The Interface consists of a parser that parses the log files of the honeypot into json storing it in a NoSQL database upon manual operating. The data from NoSQL server is then fetched by frontend and displayed.

## Frontend
(under development)
## Backend 
### Usage(Based on current dev stage)
#### LOG parsing and DB Population
After the Honeypot has appended logs into the respective folder the folowing are the usage instructons:
- Mongodb server is to be setup (if logs are to be stored in server)
- Virtual env for python is to be setup wih respective dependencies installed
```
pip install -r requirements.txt
```
- `log-parser.py` is to be used with appropriate arguments.
```
python3 log-parser.py -h

python3 log-parser.py <path to log file> --jfile <path to output json file> --mongo_server_url <url of the mongodb server to store the logs>  --mongo_db <database name>  --mongo_col <collection name>
```
This stores the logs into the specified mongodb server or json file which can later be fetched by frontend.
##### Data fields in database
```
{
    timestamp,
    host_ip,
    host_port
    host_name',
    user_agent,
    request: { method, path },
    response                                                                                                                                       
  }
```
__\_id__ will be excluded while json will be processed by api as it is a bson datatype.
The above process can be automated for multiple logs via shell scripts or higher python scripts.
#### API Calls
With the database populated now the `api-server/api-server.py` can be run with web servers like Apache with gunicorn for avoiding security risks if exposed to a larger network
#### API SERVER USAGE
For the api server to fetch data, the mongo server must be running on local or remote machine and its url is to be configured in __server-startup.sh__
First the virtual env is to be configured with the dependencies if not already done above.
```
python3 -m venv VENV

source VENV/bin/activate

pip3 -r requirements.txt

deactivate
```
Next, a database containing the user credentials must be setup for pass key authorisation 
Structure:
```
db : cred
col : userCred
conetnts of the collection : [{"username":<u1>,"password":<pass>},{...},...]
```
The database can be either manually setup by admin by interacting with mongodb 
or __database-setup.py__ is to be run once and then necessary changes are to be made ivia mongosh or other interactive methods.

Once the above process is done. The __server-startup.sh__ is to be configured for the shell env variables of the server.
Then finally it is to be given necessary perms and run.
```
chmod +x server-startup.sh

./server-startup.sh
```
This will configure and run the server.

##### API Endpoint
The template provides info about the endpoints
here's an example : 
```
http://127.0.0.1:8080/api/read/all?db=Honeylog&col=test_log&passkey=password
```
(The API currently only supports read reqests, still under development)

