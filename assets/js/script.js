//  My API key: 5b5c4ddd711eb9c884bd57dd6cff32bd
//current weather api call by city..
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//lat/long api call..more complete data... "current.uvi" value needed from this response..
//I need a One Call paid subscription now to access the UVI data. if(.clouds.all <50)then change color to red(caution)
// .weather[0].icon? AND .mian.temp, .main.humidity, .wind.speed
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

//get the lat/ long from this api call:
//http://api.openweathermap.org/geo/1.0/direct?
//q={city name}&limit={limit}&appid={API key}

var todayContainerEl = document.querySelector(".todayList"); //ul for today's weather data in the li elements
var searchTextEl = document.querySelector(".city-text"); //h element for the city name
var tempEl = document.querySelector("#today-temp"); //li elememt for today temp F value
var humEl = document.querySelector("#today-hum"); //li element for today humid % value
var windEl = document.querySelector("#today-wind"); //li element for today wind mph value
var cityInputEl = document.getElementById("city"); // input elelment for dynamic city input
var uvEl = document.querySelector(".today-uv"); //span element for uvi data
var savecityEl = document.querySelector(".list-savedcity"); //div el to hold dynamically created buttons
var btnEl = document.querySelector(".btn"); //submit button
var iconEl = document.querySelector(".icon"); //a tag for the dynamic icon based on weather data
var array = []; //global empty array for storing city search names

function loadDate() {
  var today = moment().format("dddd MMM DD");
  var date = document.querySelector("#date");
  date.textContent = today;
  var today1 = moment().add(1, "days").format("dddd MMM DD");
  var date1 = document.querySelector("#date1");
  date1.textContent = today1;
  var today2 = moment().add(2, "days").format("dddd MMM DD");
  var date2 = document.querySelector("#date2");
  date2.textContent = today2;
  var today3 = moment().add(3, "days").format("dddd MMM DD");
  var date3 = document.querySelector("#date3");
  date3.textContent = today3;
  var today4 = moment().add(4, "days").format("dddd MMM DD");
  var date4 = document.querySelector("#date4");
  date4.textContent = today4;
  var today5 = moment().add(5, "days").format("dddd MMM DD");
  var date5 = document.querySelector("#date5");
  date5.textContent = today5;
}

var searchCity = function (cityInput) {
  //use city name to get lat/ long data
  document.getElementById("buttons").innerHTML = ""; //clear the prior buttons
  var urlAPI1 =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInput +
    "&appid=5b5c4ddd711eb9c884bd57dd6cff32bd";
  //use lat/long data to get the rest of the data from this call:
  fetch(urlAPI1).then(function (response) {
    var response = response.json().then(function (data) {
      var city = data[0].name;
      searchTextEl.textContent = city;
      if (!array.includes(city)) {
        array.push(city);

        localStorage.setItem("cities", JSON.stringify(array));
      }
      createButtons();

      //get lat/ long for call to API for all stats..
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      var urlAPI2 =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&exclude=hourly,minutely&units=imperial&appid=5b5c4ddd711eb9c884bd57dd6cff32bd";
      fetch(urlAPI2).then(function (response2) {
        var response2 = response2.json().then(function (data) {
          var icono = data.current.weather[0].icon;
          iconEl.setAttribute(
            "src",
            "https://openweathermap.org/img/w/" + icono + ".png"
          );
          var temp = Math.round(data.current.temp);
          tempEl.textContent = "Temp:  " + temp + "F";
          var hum = data.current.humidity;
          humEl.textContent = "Humidity:  " + hum + "%";
          var wind = data.current.wind_speed;
          windEl.textContent = "Wind:  " + wind + "mph";
          var uv = data.current.uvi;
          uvEl.textContent = uv;
          //change color behind uvi if warning for sunburn
          if (uv > 6) {
            $(uvEl).removeClass(".today-uv").addClass("red");
          }
          for (var i = 1; i < 6; i++) {
            var temp5 = data.daily[i].temp.day;

            var hum5 = data.daily[i].humidity;

            var wind5 = data.daily[i].wind_speed;

            var listEl1 = document.querySelector(
              "[data-id='" + i + "'] :nth-child(1)"
            );
            console.log(listEl1);
            var listEl2 = document.querySelector(
              `[data-id='${i}'] :nth-child(2)`
            );
            var listEl3 = document.querySelector(
              `[data-id='${i}'] :nth-child(3)`
            );
            listEl1.textContent = "High Temp:  " + temp5 + "F";
            listEl2.textContent = "Humidity:  " + hum5 + "%";
            listEl3.textContent = "Wind:  " + wind5 + " MPH";
          }
        });
      });
    });
  });
};
//create the buttons with city names from local storage array..
var createButtons = function () {
  savecityEl.innerHTML = "";
  for (var i = 0; i < array.length; i++) {
    var button1 = document.createElement("button");
    button1.textContent = array[i];
    console.log(button1.textContent);
    $(button1).addClass("coolBtn");
    savecityEl.appendChild(button1);
  }
};
var load = function () {
  array = JSON.parse(localStorage.getItem("cities"));
  loadDate();
  createButtons();
};

var savedSearchHandler = function (event) {
  var savedCity = event.target.textContent;
  searchCity(savedCity);
};

var inputSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();
  if (cityName) {
    searchCity(cityName);
    cityInputEl.value = "";
  } else {
    alert("Please enter a valid City");
  }
};

//event listener for the button to submit city name
$(".btn").on("click", inputSubmitHandler);

$("#buttons").on("click", savedSearchHandler); //event listener for the ul element where cities are saved

load();

//this loop almost worked, something wrong with substituting 'i' for the data-id.. needs re-working
//   for (var i = 1; i < 6; i++) {
//     var temp5 = data.daily[i].temp.day;

//     var hum5 = data.daily[i].humidity;

//     var wind5 = data.daily[i].wind_speed;

//     var listEl1 = document.querySelector('[data-id="i"] :nth-child(1)');
//     console.log(listEl1);
//     var listEl2 = document.querySelector('[data-id="i"] :nth-child(2)');
//     var listEl3 = document.querySelector('[data-id="i"] :nth-child(3)');
//     listEl1.textContent = "High Temp:  " + temp5 + "F";
//     listEl2.textContent = "Humidity:  " + hum5 + "%";
//     listEl3.textContent = "Wind:  " + wind5 + " MPH";
//   }
