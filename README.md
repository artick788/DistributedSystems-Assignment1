# NMBS-Router
## About
This project is an assignment for the course Distributed Systems, teached on the University of Antwerp. It consists out 
of a simple Flask API that communicates with the NMBS API (the belgium train company) and a React front end. In the front
end, you can see a list of all the train stations in Belgium and view information over each station (such as name, 
coordinates, ...). You can also view a route between 2 selected stations by train and by car and see the traveltime.

## Documentation
After setting up the project and starting the backend, you can go to 
```
http://127.0.0.1:5000/apidocs/
```
to see a Swagger documentation of the API. Every URI endpoint is explained and provided with an example.

## Setup
There is a shell script that can be found in the root directory of the project. This will install all necessary dependencies,
create the necessary environments. The script can be executed using the following command
````bash
sudo chmod u+x ./setup.sh
sudo ./setup.sh
````

### 1. Install dependencies
First step is to install all the necessary dependencies, which can be done with the following command.
 ```bash
sudo apt install python3 nodejs curl python3-pip
```

### 2. Set up the Python3 virtual environment
This step will setup the python environment and install all the necessary packages. Make sure these commands
are done in the ~/API folder of the project.
 ```bash
cd API # go from the root directory to the correct directory
virtualenv -p python3 venv
source venv/bin/activate
pip3 install -r requirements.txt
```

### 3. Set up the front end
Last step is to install the dependencies of the front end. Make sure these commands are executed in the ~/Client/nmbs-router
folder of the project.
 ```bash
cd Client/nmbs-router # go from the root directory to the correct directory
npm i
```

## Run
### 1. Start Back-end (Flask)
The python backend can be started using the following command (executed in the root directory of the project)
 ```bash
python3 API/main.py
```

### 2. Start front-end (React)
Using npm, we start the front-end with the following command. Make sure that this command is executed is the
~/Client/nmbs-router directory of the project
 ```bash
cd Client/nmbs-router # go from the root directory to the correct directory
npm start
```
