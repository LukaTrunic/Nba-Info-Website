//sticky
window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");

var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
//sticky

//api
let weather = {
  apiKey: "75300c6e8571b350bd80fa2a9faa2e5a",
  fetchWeather: function (city) { //we used fetch to get info about the weather
    fetch( //fetch the url
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" + 
        this.apiKey
      )
      .then((response) => { //once the url is fetched, then we get a response
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
          }
        return response.json();
      })
      .then((data) => this.displayWeather(data)); //to get all this data to the displayWeather function
  },
  displayWeather: function (data) { //display weather on the page
    const { name } = data; //to get the city name out of the data (which is the link with the api), and it will extract the name from the object (link)
    const { icon, description } = data.weather[0]; //it will extract the icon and description from the data weather object in the link
    const { temp, humidity } = data.main; //extract temperature and humidity from the main part of the data
    const { speed } = data.wind; //extract speed from the wind part
    document.querySelector(".city").innerText = "Weather in " + name; //to display this info on the page
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading"); //so there is not wrong information when the user loads the page
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')"; //I tried the image background to be of a city when you type its name but it did not work so I just forgot about it
  },
  search: function () { //2.this gets the content of the search-bar
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
//to make the search bar work
document.querySelector(".search button").addEventListener("click", function () { //1.when you click, it's going to do the function
  weather.search(); //this will get the content of the search bar, and search for it
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
  }
}); //key, if you press Enter, to search for it

weather.fetchWeather("New York"); //for New York to be the first city when you load the page
//api

//form validation
function validateForm(){

  var fname = document.getElementById('fname').value;
  var lname = document.getElementById('lname').value;
  var email = document.getElementById('email').value;
  var country = document.getElementById('country').value;
  var topic = document.getElementById('topic').value;

  var fnamecheck = /^[a-zA-Z]+$/;
  var lnamecheck = /^[a-zA-Z]+$/;
  var emailcheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  var countrycheck = country;
  var topiccheck = topic;

  var val = document.getElementById('subject').value;

  if(fnamecheck.test(fname)){
    document.getElementById('firstname').innerHTML = " ";
  }else {
    document.getElementById('firstname').innerHTML = "First name is invalid";
    return false;
  }

  if(lnamecheck.test(lname)){
    document.getElementById('lastname').innerHTML = " ";
  }else {
    document.getElementById('lastname').innerHTML = "Last name is invalid";
    return false;
  }

  if(emailcheck.test(email)){
    document.getElementById('emails').innerHTML = " ";
  }else {
    document.getElementById('emails').innerHTML = "Email is invalid";
    return false;
  }
  
  if(countrycheck == '-1'){
    document.getElementById('countries').innerHTML = "Select a Country";
    return false;
  }

  if(topiccheck == '-1'){
    document.getElementById('topics').innerHTML = "Select a Topic";
    return false;
  }

  if (/^\s*$/g.test(val) || val.indexOf('\n') != -1) {
    document.getElementById('subjects').innerHTML = "Write something here";
    return false;
  }

}
//form validation