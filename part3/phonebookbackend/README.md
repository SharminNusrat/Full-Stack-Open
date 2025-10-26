# Phonebook Backend
This is the backend server for the Phonebook application built with **Node.js** and **Express**. It provides a RESTful API to manage a list of contacts - each with a name and a number.

## Live Demo
The backend is deployed on Render and is accessible at:
https://full-stack-open-x0l2.onrender.com/

## Running the application on your own machine
1. Clone this repository to your own machine with the command 
```bash
git clone https://github.com/SharminNusrat/Full-Stack-Open.git
```
2. Change directory to the Phonebook backend folder using:
```bash
cd Full-Stack-Open/part3/phonebookbackend
```
3. Install the node modules with the command
```bash
npm install
```
4. Create a .env file in the root of the project with the following content:
```bash
PORT=3001
MONGODB_URI=your_database_connection_string
```
5. Start the development server with the command
```bash
npm run dev
```
The backend server will run locally at http://localhost:3001