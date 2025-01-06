# Interface Structure and Functionality

## Structure
The Interface consists of a parser that parses the log files of the honeypot into json storing it in a NoSQL database upon manual operating. The data from NoSQL server is then fetched by frontend and displayed.

## Frontend
(under development)
## Backend 
### Usage(Based on current dev stage)
- After the Honeypot has appended logs into the respective folder, `log-parser.py` is to be used.
```
python3 log-parser.py <path to log file> <path to output json file>
```
The above process can be automated via shell scripts or higher python scripts.
- This collection of file is to be loaded into the NoSQL server
(under development)
