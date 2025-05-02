// obtener los ids y clases de los elementos del html
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-btn");
const currentWeatherDiv = document.querySelector(".current-weather")
const daysForecastDiv = document.querySelector(".days-forecast")
const locationButton = document.querySelector(".location-btn")

const API_KEY = "5242601b653d083fabfa75f432d18813"; // clave de la api -> https://home.openweathermap.org/api_keys

// Crear una tarjeta meteorológica HTML basada en datos meteorológicos
const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) {
        return `<div class="mt-3 d-flex justify-content-between">
                    <div>
                        <h3 class="fw-bold">${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h3>
                        <h6 class="my-3 mt-3">Temperatura: ${((weatherItem.main.temp - 273.15).toFixed(2))}°C</h6>
                        <h6 class="my-3">Viento: ${weatherItem.wind.speed} M/S</h6>
                        <h6 class="my-3">Humedad: ${weatherItem.main.humidity}%</h6>
                    </div>
                    <div class="text-center me-lg-5">
                        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather icon">
                        <h6>${weatherItem.weather[0].description}</h6>
                    </div>
                </div>`;
    } else {
        return `<div class="col mb-3">
                    <div class="card border-0 bg-secondary text-white">
                        <div class="card-body p-3 text-white">
                            <h5 class="card-title fw-semibold">(${weatherItem.dt_txt.split(" ")[0]})</h5>
                            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="weather icon">
                            <h6 class="card-text my-3 mt-3">Temp: ${((weatherItem.main.temp - 273.15).toFixed(2))}°C</h6>
                            <h6 class="card-text my-3">Viento: ${weatherItem.wind.speed} M/S</h6>
                            <h6 class="card-text my-3">Humedad: ${weatherItem.main.humidity}%</h6>
                        </div>
                    </div>
                </div>`;
    }
}

// Obtener detalles meteorológicos de la latitud y longitud pasadas
const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    // hacer una solicitud de API para obtener los detalles meteorológicos
    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
        const forecastArray = data.list; // obtener la matriz de pronóstico de 5 días
        const uniqueForecastDays = new Set();  // crear un conjunto para almacenar días únicos

        // filtrar los datos meteorológicos para obtener los datos meteorológicos de 5 días únicos
        const fiveDaysForecast = forecastArray.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate(); // obtener el día del mes

            // agregar el día del mes al conjunto si no existe y el conjunto tiene menos de 6 elementos
            if (!uniqueForecastDays.has(forecastDate) && uniqueForecastDays.size < 6) {
                uniqueForecastDays.add(forecastDate); // agregar el día del mes al conjunto
                return true; // devolver verdadero para agregar el elemento a la matriz de pronóstico de 5 días
            }
            return false; // devolver falso para no agregar el elemento a la matriz de pronóstico de 5 días
        });

        cityInput.value = ""; // limpiar el campo de entrada
        currentWeatherDiv.innerHTML = ""; // limpiar el div de pronóstico actual
        daysForecastDiv.innerHTML = ""; // limpiar el div de pronóstico de 5 días

        // crear tarjetas meteorológicas HTML para cada elemento de la matriz de pronóstico de 5 días
        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index); // crear tarjeta meteorológica HTML

            // si el índice es 0, inserte la tarjeta meteorológica en el div de pronóstico actual, de lo contrario, inserte la tarjeta meteorológica en el div de pronóstico de 5 días
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                daysForecastDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        // mostrar un mensaje de error si se produce un error al obtener los detalles meteorológicos
        alert("¡Ocurrió un error al obtener el pronóstico del tiempo!");
    });
}

// Obtener las coordenadas del nombre de la ciudad ingresada
const getCityCoordinates = () => {
    const cityName = cityInput.value.trim(); // obtener el nombre de la ciudad ingresada
    if (cityName === "") return; // si el nombre de la ciudad está vacío, no haga nada

    // crear la URL de la API para obtener las coordenadas de la ciudad
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
  
    // hacer una solicitud de API para obtener las coordenadas de la ciudad
    fetch(API_URL).then(response => response.json()).then(data => {
        // mostrar un mensaje de error si no se encuentran coordenadas
        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { lat, lon, name } = data[0]; // obtener latitud, longitud y nombre de la ciudad
        getWeatherDetails(name, lat, lon); // obtener detalles meteorológicos de la latitud y longitud pasadas
    }).catch(() => {
        // mostrar un mensaje de error si se produce un error al obtener las coordenadas
        alert("¡Ocurrió un error al obtener las coordenadas!");
    });
}

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; // Obtener coordenadas de ubicación del usuario
            // Obtener el nombre de la ciudad a partir de coordenadas utilizando la API de codificación geográfica inversa
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL).then(response => response.json()).then(data => {
                const { name } = data[0];
                getWeatherDetails(name, latitude, longitude);
            }).catch(() => {
                alert("¡Se produjo un error al obtener el nombre de la ciudad!");
            });
        },
        error => { // Mostrar alerta si el usuario negó el permiso de ubicación
            if (error.code === error.PERMISSION_DENIED) {
                alert("Solicitud de geolocalización denegada. Restablezca el permiso de ubicación para otorgar acceso nuevamente.");
            } else {
                alert("Error de solicitud de geolocalización. Restablezca el permiso de ubicación.");
            }
        });
}
locationButton.addEventListener("click", getUserCoordinates);

// agregar un controlador de eventos al botón de búsqueda
searchButton.addEventListener("click", () => getCityCoordinates());