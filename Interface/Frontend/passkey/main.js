
//CONSTANTS FOR BACKEND, LATER TO BE CONTROLLED FROM ADMIN PANNEL
const DATABASE="Honeylogs";
const COLLECTION="httplog";
const ENDPOINT = "http://127.0.0.1:8080/api/read/all";
//IO
const fetchButton= document.getElementById('fetchBtn');
const resetButton = document.getElementById('resetBtn');
const passKey = document.getElementById('passkey');
//Fields
const outputField = document.getElementById('output');


// Fetches data

async function getData(url){
	try{
		const serverResponse= await fetch(url);
		if(!serverResponse.ok){
			outputfield.innerText="Network error";
			return;
		}
		const data= await serverResponse.json();
		return data;
		
	}
	catch(error){
		outputfield.innerText="Fetch error";
	
	}


}




// Creates dom targets for charts
function createDOMTargets(){
	//DOM output target creation
	const outputDiv = document.getElementById('output');
	//METHOD PIE
	const div1 = document.createElement("div");
	div1.classList.add("Mychart");
	const canvas1 = document.createElement("canvas");
	canvas1.id = "method";
	div1.appendChild(canvas1);
	outputDiv.appendChild(div1);
	//PATH PIE
	const div2 = document.createElement("div");
	div2.classList.add("Mychart");
	const canvas2 = document.createElement("canvas");
	canvas2.id = "path";
	div2.appendChild(canvas2);
	outputDiv.appendChild(div2);
	//HOSTNAME PIE
	const div3 = document.createElement("div");
	div3.classList.add("Mychart");
	const canvas3 = document.createElement("canvas");
	canvas3.id = "hostname";
	div3.appendChild(canvas3);
	outputDiv.appendChild(div3);
	//HOSTIP PIE
	const div4 = document.createElement("div");
	div4.classList.add("Mychart");
	const canvas4 = document.createElement("canvas");
	canvas4.id = "host_ip";
	div4.appendChild(canvas4);
	outputDiv.appendChild(div4);
	//USERAGENT PIE
	const div5 = document.createElement("div");
	div5.classList.add("Mychart");
	const canvas5 = document.createElement("canvas");
	canvas5.id = "user_agent";
	div5.appendChild(canvas5);
	outputDiv.appendChild(div5);
}

//Parses the data for visualisation
function processData(arr) {
	  let methodMap = new Map();
	  let pathMap = new Map();
	  let hostNameMap = new Map();
	  let hostIPMap = new Map();
	  let userAgentMap = new Map();
	  arr.forEach((item) => {
	    if (hostIPMap.has(item.host_ip)) {
	      hostIPMap.set(item.host_ip, hostIPMap.get(item.host_ip) + 1);
	    } else {
	      hostIPMap.set(item.host_ip, 1);
	    }
	    if (hostNameMap.has(item.host_name)) {
	      hostNameMap.set(item.host_name, hostNameMap.get(item.host_name) + 1);
	    } else {
	      hostNameMap.set(item.host_name, 1);
	    }
	    if (methodMap.has(item.request.method)) {
	      methodMap.set(item.request.method, methodMap.get(item.request.method) + 1);
	    } else {
	      methodMap.set(item.request.method, 1);
	    }
	    if (pathMap.has(item.request.path)) {
	      pathMap.set(item.request.path, pathMap.get(item.request.path) + 1);
	    } else {
	      pathMap.set(item.request.path, 1);
	    }
	    if (userAgentMap.has(item.user_agent)) {
	      userAgentMap.set(item.user_agent, userAgentMap.get(item.user_agent) + 1);
	    } else {
	      userAgentMap.set(item.user_agent, 1);
	    }
	  });
	  let res = [
	    Object.fromEntries(methodMap), 
	    Object.fromEntries(pathMap), 
	    Object.fromEntries(hostNameMap), 
	    Object.fromEntries(hostIPMap),
	    Object.fromEntries(userAgentMap)
	  ];

	  return res;
}

  
// Generats Random RGB with A set to 0.75
function randRGBA() {
	  const r = Math.floor(Math.random() * 256);
	  const g = Math.floor(Math.random() * 256);
	  const b = Math.floor(Math.random() * 256);
	  const a = 0.5; 
	  return ` rgba(${r}, ${g}, ${b}, ${a}) `;
}


  
//CHART POPULATION


function populateChart(dataobj){


	let processedData=processData(dataobj.data);
	let colorsets=[];
	for (let i = 0; i < processedData.length; i++) {
	    let colorset = [];
	    for (let j = 0; j < Object.keys(processedData[i]).length; j++) {
		colorset.push(randRGBA()); // Ensure randRGBA() works as expected
	    }
	    colorsets.push(colorset);
	}


	const methodCanvasCtx = document.getElementById("method").getContext("2d");
	const pathCanvasCtx = document.getElementById("path").getContext("2d");
	const hostNameCanvasCtx = document.getElementById("hostname").getContext("2d");
	const hostIPCanvasCtx = document.getElementById("host_ip").getContext("2d");
	const userAgentCanvasCtx = document.getElementById("user_agent").getContext("2d");


	var methodChart = new Chart(methodCanvasCtx, {
	    type: 'pie',
	    data: {
		labels: Object.keys(processedData[0]),
		datasets: [{
		    label: 'Product A Sales',
		    data: Object.values(processedData[0]),
		    backgroundColor: colorsets[0],
		    borderColor: colorsets[0],
		    borderWidth: 0
		}]
	    },
	    options: {
		responsive: true,
		plugins: {
		    legend: {
		        position: 'top',
		    },
		    tooltip: {
		        callbacks: {
		            label: function(tooltipItem) {
		                return tooltipItem.label + ': ' + tooltipItem.raw;
		            }
		        }
		    }
		}
		}
	    
	});


	var pathChart = new Chart(pathCanvasCtx, {
	    type: 'pie',
	    data: {
		labels: Object.keys(processedData[1]),
		datasets: [{
		    label: 'Product A Sales',
		    data: Object.values(processedData[1]),
		    backgroundColor: colorsets[1],
		    borderColor: colorsets[1],
		    borderWidth: 0
		}]
	    },
	    options: {
		responsive: true,
		plugins: {
		    legend: {
		        position: 'top',
		    },
		    tooltip: {
		        callbacks: {
		            label: function(tooltipItem) {
		                return tooltipItem.label + ': ' + tooltipItem.raw;
		            }
		        }
		    }
		}
		}
	    
	});


	var hostNameChart = new Chart(hostNameCanvasCtx, {
	    type: 'pie',
	    data: {
		labels: Object.keys(processedData[2]),
		datasets: [{
		    label: 'Product A Sales',
		    data: Object.values(processedData[2]),
		    backgroundColor: colorsets[2],
		    borderColor: colorsets[2],
		    borderWidth: 0
		}]
	    },
	    options: {
		responsive: true,
		plugins: {
		    legend: {
		        position: 'top',
		    },
		    tooltip: {
		        callbacks: {
		            label: function(tooltipItem) {
		                return tooltipItem.label + ': ' + tooltipItem.raw;
		            }
		        }
		    }
		}
		}
	    
	});

	var hostIPChart = new Chart(hostIPCanvasCtx, {
	    type: 'pie',
	    data: {
		labels: Object.keys(processedData[3]),
		datasets: [{
		    label: 'Product A Sales',
		    data: Object.values(processedData[3]),
		    backgroundColor: colorsets[3],
		    borderColor: colorsets[3],
		    borderWidth: 0
		}]
	    },
	    options: {
		responsive: true,
		plugins: {
		    legend: {
		        position: 'top',
		    },
		    tooltip: {
		        callbacks: {
		            label: function(tooltipItem) {
		                return tooltipItem.label + ': ' + tooltipItem.raw;
		            }
		        }
		    }
		}
		}
	    
	});

	var userAgentChart = new Chart(userAgentCanvasCtx, {
	    type: 'pie',
	    data: {
		labels: Object.keys(processedData[4]),
		datasets: [{
		    label: 'Product A Sales',
		    data: Object.values(processedData[4]),
		    backgroundColor: colorsets[4],
		    borderColor: colorsets[4],
		    borderWidth: 0
		}]
	    },
	    options: {
		responsive: true,
		plugins: {
		    legend: {
		        position: 'top',
		    },
		    tooltip: {
		        callbacks: {
		            label: function(tooltipItem) {
		                return tooltipItem.label + ': ' + tooltipItem.raw;
		            }
		        }
		    }
		}
		}
	    
	});


}



//IO functionality--------------------------------------------------------------------------------------------main-------------------------------------------------------------------------------------------------------------------
resetButton.addEventListener(
"click",
  ()=>{
  outputField.innerHTML=" ";
  passkey.value="";
  }
);

fetchButton.addEventListener(
"click",
async ()=>{

let pass_key=passKey.value; // Has the pass key
if(pass_key==""){
outputField.innerHTML="Please Enter a Passkey";
return;
}
passkey.value="";
outputField.innerHTML=""; // clear the output field

//URL construction
var url = ENDPOINT+`?db=${DATABASE}&col=${COLLECTION}&passkey=${pass_key}`;
var fetchedData= await getData(url);
if(fetchedData.status==401){
	outputField.innerHTML="Passkey is Incorrect"
	return;
}
else if(fetchedData.status!=200){
	outputField.innerHTML=`Error code : ${fetchedData.status}`;
	return;
}
createDOMTargets();
populateChart(fetchedData);
}
);
