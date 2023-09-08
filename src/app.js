function formatDate(timeStamp) {
let date = new Date(timeStamp);

let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}` ;
}

let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}` ;
}

let days = [
    "Sunday",
     "Monday",
      "Tuesday",
       "Wednesday",
        "Thursday", 
        "Friday", 
        "Saturday"
    ]
let day = days[date.getDay()];
return `${day} ${hours} ${minutes}`;
}

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

return days[day];

}

function displayForecast(response) {
    let forcast = (response.data.daily);
    
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">` ;

     forcast.forEach(function (forcastDay, index) {
        if (index < 6) {
        forecastHTML = forecastHTML +  ` 
        <div class="col-2">
          <div class="weather-Forecast-date">${formatDay(forcastDay.dt)}</div>
        
            <img src="http://openweathermap.org/img/wn/${forcastDay.weather[0].icon}@2x.png" alt="" width="42px" > 
    <div class="Weather-Forecast-temperatures">
    <span class="weather-forecast-temperature-max">${Math.round(forcastDay.temp.max)}°</span>
    <span class="weather-forecast-temperature-min">${Math.round(forcastDay.temp.min)}°</span>
    </div>
        </div>
        `;
    }
     });

    forecastHTML = forecastHTML +  `</div>`;
    forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates){
    console.log(coordinates);

let apiKey = "c5f0e59acac64258bb92ed027d20c68f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

celciusTemperature = response.data.main.temp;


    temperatureElement.innerHTML = Math.round
    (celciusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function search(city){
    let apiKey = "86e1f6d79b089f220cfb38504fe9d326";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}


function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}


//Adding event listener to the form and button
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York")
