function searchCity(event) {
  event.preventDefault();
  let cities = document.querySelector(".citySearch");
  let city = cities.value;
  let key = "ab859d32ae4bbdc8f3eaa28b40210b92";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentPositionNow(position) {
  let latt = position.coords.latitude;
  let lonn = position.coords.longitude;
  let key = "ab859d32ae4bbdc8f3eaa28b40210b92";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${lonn}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let showDegrees = document.querySelector("#degrees");
  showDegrees.innerHTML = `${temp}ºC`;

  let desription = response.data.weather[0].main;
  let showDescription = document.querySelector("#description");
  showDescription.innerHTML = desription;

  let humidity = response.data.main.humidity;
  let showHumidity = document.querySelector(".humidity");
  showHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let showWind = document.querySelector(".wind");
  showWind.innerHTML = `Wind: ${wind} km/h`;

  let city = response.data.name;
  let showCity = document.querySelector("h1");
  showCity.innerHTML = city;
}

function minutes() {
  let min = now.getMinutes();
  if (min < 10) {
    return `0${min}`;
  } else {
    return `${min}`;
  }
}

let search = document.querySelector(".btn-primary");
search.addEventListener("click", searchCity);
let cur = document.querySelector(".btn-success");
cur.addEventListener("click", currentPosition);

function currentPosition() {
  navigator.geolocation.getCurrentPosition(currentPositionNow);
}

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let dayToday = document.querySelector("#day-today");
dayToday.innerHTML = `${day} ${hour}:${minutes()}`;
