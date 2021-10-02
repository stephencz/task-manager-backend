# Overview
*Task Manager Backend* is a NodeJS, ExpressJS, and MySQL REST API backend designed to be used with [task-manager-frontend](https://github.com/stephencz/task-manager-frontend).

## How to Build
Before you can make use of the frontend you have to build and serve the backend. The instructions for building the backend are as follow:

1. `git clone https://github.com/stephencz/task-manager-backend`
2. `cd task-manager-backend`
3. Create a `.env` file in root directory and fill in the same variables provided in the example `.env` file below. HOST_PORT is the port the backend will run on. DB_HOST is IP of the host running the backend. DB_USERNAME and DB_password are the username and password for the MySQL account you want to use. And DB_NAME is the name of the database the backend will create.
4. `npm run build`
5. Once it builds successfully you have to serve it in some way. You can install `serve` using `npm install serve -g`, and serve the application using `serve -s build/`. Or you can find a more dedicated solution such as `pm2` depending on your requirements and set up.

### Example .env
```
HOST_PORT=8000  
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=task_manager
```
