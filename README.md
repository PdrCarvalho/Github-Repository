# Github-Repository ###

## About ##

This project has as a requirement the listing of GitHub's public repository and a system to archive the desired ones. Saving the main data of the repository, list of contributors and the last 3 open pull requestes.
The system has a backend application in Nodejs and a frontend application in Reactjs.

## Starting ##

### Backend 

The first step to start the project is to execute the backend.
For this, two ways were made available: using [Docker-Compose](https://docs.docker.com/compose/) and using [MongoDB](https://www.mongodb.com/) database on your machine.

#### Using [Docker-Compose](https://docs.docker.com/compose/)

Access the backend folder in the terminal and execute:

```
docker-compose up --build
```
start Node application containers, [MongoDB](https://www.mongodb.com/) database and open the logs of the two environments on your terminal. If you want to run everything in the backgroud add ``` -d ``` at the end of the command.

#### Using [MongoDB](https://www.mongodb.com/) on your machine 

MongoDB installed on your machine. You must change the URL of the mongo in the ``` .env ``` file of the backend's home folder. Putting the settings that point to your machine for example:

```
MONGO_URL=mongodb://mongo:27017/github-repositoriess
```
install the dependencies:

```
yarn 
```
or 
```
npm install
```
You can now go to the root of the backend project and execute these two commands:
```
yarn build

yarn start
```
The first command will transpile the code to the dist folder by changing the code snippets in modern javascript to a format that the system is capable of running in production and the second command will start the application.

Another command to run the application without using Builde is:
```
yarn dev
```
This option is not optimized and will restart the application for any code changes.

There is a simple documentation of the postman Api's routes
[https://documenter.getpostman.com/view/7335439/T17FBUKb?version=latest](https://documenter.getpostman.com/view/7335439/T17FBUKb?version=latest)

### Frontend 

After accessing the frontend folder, it will be necessary to install the dependencies:

```
yarn 
```
or 
```
npm install
```
Now just run:
```
yarn start
```
or 
```
npm start
```
will run the application on your machine and open the page in your browser.

To generate the files to deploy on the WEB it will be necessary to run yarn build.

### Attention ###

The backend application will be run on port 3333 while the frontend on port 3000. Keep these ports free before executing the change in code.
##### You only have 60 requests per hour for Github Api. Use them wisely. #####
