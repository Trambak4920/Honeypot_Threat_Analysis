import re
import argparse
import json
#These patterns are specific to the log structure
SPLIT_SECTION = r"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+.+?)(?=\d{4}-\d{2}-\d{2}T\d{2}|\Z)"  # start regex pattern
IP_PORT_NOTATION_PATTERN = r"From (\d+\.\d+\.\d+\.\d+):(\d+)"  # Regex to capture IP and Port
REQUEST_PATTERN = r"(GET|POST|PUT|DELETE|HEAD|PATCH)\s([^\s]+)\sHTTP/\d+\.\d+"  # HTTP request method and path
RESPONSE_PATTERN = r"Sent:\s+b'(.*)'"  # Capture the response body


def parser(log):
    log = log.strip()
    pattern = re.compile(SPLIT_SECTION, re.DOTALL)
    log_elements = pattern.findall(log)  # elements are individual req-resp log objects
    
    json_list = []
    for log_obj in log_elements:
        timestamp = log_obj.split(" - ")[0]
        
        # Fixing this line to use group(1) and group(2) for extracting host and port correctly
        ip_port_pair = re.search(IP_PORT_NOTATION_PATTERN, log_obj)
        if ip_port_pair:
            host = ip_port_pair.group(1)
            port = ip_port_pair.group(2)
        else:
            host, port = None, None
            
        request_match = re.search(REQUEST_PATTERN, log_obj)
        request = None
        if request_match:
            request = {
                "method": request_match.group(1),
                "path": request_match.group(2)
            }

        response_match = re.search(RESPONSE_PATTERN, log_obj)
        response = None
        if response_match:
            response = response_match.group(1).strip()
  
        json_list_obj = {"timestamp": timestamp, "host": host, "port": port, "request":request,"response":response}
        json_list.append(json_list_obj)
    
    return json_list
    
def file_reader(filepath):
	try:
		fp=open(filepath,"r")
		data = fp.read()
		fp.close()
		return data
	except:
		return None

def json_output(json_list,output_file):
	fp = open(output_file,"w")
	json.dump(json_list, fp, indent=3)
	fp.close()
	


def main_setup():
	cli_parser =argparse.ArgumentParser(description="Parse logfile to json")
	cli_parser.add_argument("logfile",help="path to logfile")
	cli_parser.add_argument("jfile",help="path to output jsonfile")
	args=cli_parser.parse_args()
	log_data = file_reader(args.logfile)
	if(not log_data):
		print(f"Invalid logfilepath {args.logfile}")
		return
	
	json_list = parser(log_data)
#	for i in json_list:
#		print(i)
	json_output(json_list,args.jfile)
		



if __name__ == "__main__":
	
	main_setup()




