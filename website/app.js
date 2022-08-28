/* Global Variables */
const key = '&appid=69ac289b860228509ae4debe9aa01f06&units=imperial';
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";
/* if (typeof window !== 'undefined') {
   console.log('You are on the browser')
 } else {
   console.log('You are on the server')
 } */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// when user clicks generate: 

const generate = document.getElementById('generate')
generate.addEventListener('click', performAction);

function performAction(e) {
  e.preventDefault();
  //Selecting user input
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  // 
  console.log(`Event clicked and succesfully retrieved data from API ${url}${zip}${key}`);
  getWeather(url, zip, key)
    // New Syntax!

  .then (function(data) {
      // Add data to POST request
      postData('/add', {
        date: newDate,
        temp: data.main.temp,
        //city: data.name,
        weather: data.weather[0].description,
        content
      })
    })
  .then (() => {
    updateUI();
  })
  }

//Make GET request
const getWeather = async (url, zip, key) => {
  try {
    const res = await fetch(url+zip+key);
    const data = await res.json();
    return data;
    }
    
  catch (error) {
    console.log('error', error);
  }
};

//SETUP ASYNC POST REQUEST WITH PROMISE AND FETCH API
// POST data from openWeather
const postData = async (url = '', data = {}) => {
  console.log(data);
  const res = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      //city: data.name,
      weather: data.weather,
      content: data.content
    })
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// to GET projectData (code from rubric)
const updateUI = async () => {
  const res = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await res.json()

    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + "°F";
   // document.getElementById('city').innerHTML = allData.name;
    document.getElementById('weather').innerHTML = allData.weather;
    document.getElementById('content').innerHTML = "\"" + allData.content + "\"";
    document.getElementById("date").innerHTML = allData.date;
  }
  catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
}