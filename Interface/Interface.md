# Interface Structure and Functionality

## Structure
The Interface consists of a parser that parses the log files of the honeypot into json storing it in a NoSQL database upon manual operating. The data from NoSQL server is then fetched by frontend and displayed.

## Frontend
(under development)
## Backend 
### Usage(Based on current dev stage)
After the Honeypot has appended logs into the respective folder the folowing are the usage instructons:
- Mongodb server is to be setup (if logs are to be stored in server)
- Virtual env for log-parser is to be setup wih respective dependencies installed
```
pip install -r requirements.txt
```
- `log-parser.py` is to be used with appropriate arguments.
```
python3 log-parser.py -h

python3 log-parser.py <path to log file> --jfile <path to output json file> --mongo_server_url <url of the mongodb server to store the logs>  --mongo_db <database name>  --mongo_col <collection name>
```
This stores the logs into the specified mongodb server or json file which can later be fetched by frontend.

The above process can be automated for multiple logs via shell scripts or higher python scripts.

