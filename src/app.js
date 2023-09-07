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


function displayForecast() {
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">` ;
    let days = ["Thu", "fri", "sat", "sun"];
     days.forEach(function(day) {
        forecastHTML = forecastHTML +  ` 
        <div class="col-2">
          <div class="weather-Forecast-date">${day}</div>
            <img src="https://ssl.gstatic.com/onebox/weather/64/sunny.png" width="42px"  id="icon"/> 
    <div class="Weather-Forecast-temperatures">
    <span class="weather-forecast-temperature-max">18°</span>
    <span class="weather-forecast-temperature-min">12°</span>
    </div>
        </div>
        `;
     });

    forecastHTML = forecastHTML +  `</div>`;
    forecastElement.innerHTML = forecastHTML;
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

//convertion of the temperature
function  displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature")
    //remove the active from the celcius link
    celciuslink.classList.remove("active");
    fahrenheitlink.classList.add("active");
    let fahrenheitTemperature = (celciusTemperature * 9/5) + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function  displayCelciusTemperature(event) {
    event.preventDefault();
//add the active from the celcius link
celciuslink.classList.add("active");
fahrenheitlink.classList.remove("active");

    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round(celciusTemperature);
}


let celciusTemperature = null

//Adding event listener to the form and button
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


//displaying the temperature
let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celciuslink = document.querySelector("#celcius-link");
celciuslink.addEventListener("click", displayCelciusTemperature);


search("New York")
displayForecast();