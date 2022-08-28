// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
``
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
// Callback to debug
const server = app.listen(port, ()=>{
  console.log(`running on localhost: ${port}`);
});

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/all', async (req, res) => {
  console.log(projectData);
  res.send(projectData);
});

// Post Route
app.post('/add', async (req, res) => {
    console.log("POST succesful");
    const body = await req.body;
    projectData = body;
    console.log(body);
    res.send(projectData);
});