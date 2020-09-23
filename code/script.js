const weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=2163e0bcc8eaa7f0951284d8a650a723&lang=sv';
const forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=2163e0bcc8eaa7f0951284d8a650a723';

const currentWeatherContainer = document.getElementById("current-weather-container");
const weatherForecastContainer = document.getElementById("weather-forecast-container");


const currentWeather = () => {
fetch(weatherAPI)
.then((respons) => {
    return respons.json();
}) 
.then ((weather) => {
    const weatherTemp = weather.main.temp.toFixed(0)
    const sunrise = new Date(weather.sys.sunrise * 1000)
    const sunriseString = sunrise.toLocaleTimeString('se-SE', {hour: '2-digit', minute:'2-digit'})
    const sunset = new Date(weather.sys.sunset * 1000)
    const sunsetString = sunset.toLocaleTimeString('se-SE', {hour: '2-digit', minute:'2-digit'})
    const weatherDescription = weather.weather[0].description
    currentWeatherContainer.innerHTML = `<h1>${weatherTemp}<sup>&degC</sup></h1><h2>${weather.name}</h2><p>${weatherDescription}</p><div class="sun"><p>Sunrise: ${sunriseString} </p> <p>Sunset: ${sunsetString} </p></div>`
})

}

const weatherForecast = () => {
    fetch(forecastAPI)
    .then ((response) => {
        return response.json();
    })
    .then ((forecast) => {
        const filteredForecast = forecast.list.filter(item => item.dt_txt.includes('12:00'));
        console.log(filteredForecast)
        filteredForecast.forEach((item => {
        const forecastTemp = item.main.temp.toFixed(0)
        const forecastDay = new Date(item.dt * 1000).toLocaleDateString('se-SE', {weekday: 'short'})
        let forecastImage = "";
        if (item.weather[0].icon === "01d") {
            forecastImage = "http://openweathermap.org/img/wn/01d@2x.png"
        } else if (item.weather[0].icon === "02d") { 
            forecastImage = "http://openweathermap.org/img/wn/02d@2x.png"
        }
        else if (item.weather[0].icon === "03d") { 
            forecastImage = "http://openweathermap.org/img/wn/03d@2x.png"
        }
        else if (item.weather[0].icon === "04d") { 
            forecastImage = "http://openweathermap.org/img/wn/04d@2x.png"
        }
        else if (item.weather[0].icon === "09d") { 
            forecastImage = "http://openweathermap.org/img/wn/09d@2x.png"
        }
        else if (item.weather[0].icon === "10d") { 
            forecastImage = "http://openweathermap.org/img/wn/10d@2x.png"
        }
        else if (item.weather[0].icon === "11d") { 
            forecastImage = "http://openweathermap.org/img/wn/11d@2x.png"
        }
        else if (item.weather[0].icon === "13d") { 
            forecastImage = "http://openweathermap.org/img/wn/13d@2x.png"
        }
        else if (item.weather[0].icon === "50d") { 
            forecastImage = "http://openweathermap.org/img/wn/50d@2x.png"
        }

        let forecastHTML = '';
        forecastHTML += `<div class="forecast-day">`;
        forecastHTML += ` <p>${forecastDay}</p>`;
        forecastHTML += ` <div class="temp">`;
        forecastHTML += `  <img src="${forecastImage}"/><p> ${forecastTemp}&degC </p>`;
        forecastHTML += ` </div>`;
        forecastHTML += `</div>`;

        weatherForecastContainer.innerHTML += `${forecastHTML}`;

        }))
        
    })
}


currentWeather();
weatherForecast();