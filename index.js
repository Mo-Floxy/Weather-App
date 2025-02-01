const apikey = "0e400ff44b79686930aba79e2b3f5531"; 
const apiurl ="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const WEATHER_ICON = document.getElementById("sticker");

async function checkWeather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);
  
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector("#weather").style.display = "none";
  } else {
        var data = await response.json();
        console.log(data);

        const city2 = document.querySelector(".city");
        city2.innerHTML = data.name;

        const temp = document.querySelector(".temp");
        temp.innerHTML = Math.round(data.main.temp) + "°C";

        const humidity = document.querySelector(".humidity");
        humidity.innerHTML = data.main.humidity + "%";

        const wind = document.querySelector(".wind");
        wind.innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
          WEATHER_ICON.src = "⛅";
        } else if (data.weather[0].main == "Clear") {
          WEATHER_ICON.src = "☀";
        } else if (data.weather[0].main == "Rain") {
          WEATHER_ICON.src = "🌧️";
        } else if (data.weather[0].main == "Drizzle") {
          WEATHER_ICON.src = "🌦";
        } else if (data.weather[0].main == "Mist") {
          WEATHER_ICON.src = "🌫️";
        }
        document.querySelector("#weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
  }

}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})