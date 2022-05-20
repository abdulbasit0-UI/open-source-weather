const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const weatherError = document.querySelector(".weather-error");
const weatherInfo = document.querySelector(".weather-info");
const weatherInfoBox1 = document.querySelector(".weather-info-data-box-1");
const weatherInfoBox2 = document.querySelector(".weather-info-data-box-2");
const weatherInfoBox3 = document.querySelector(".weather-info-data-box-3");
const weatherInfoData = document.querySelector(".weather-info-data");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value;
  const url = "/weather?address=" + location;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        weatherError.textContent = data.error;
        weatherError.style.padding = "10px";
        weatherError.style.display = "block";
        weatherInfo.style.display = "none";
        weatherInfoData.style.display = "none";
      } else {
        weatherInfo.style.display = "block";
        weatherInfoData.style.display = "flex";
        weatherError.style.display = "none";
        weatherInfo.innerHTML = `
        <h2>${data.locations}</h2>
        <h4 class="weather_temp">${data.temp_c} ℃</h4>
        <p>Feels Like ${data.feelslike_c}</p>
        <img src=${data.icon}>
        <p>${data.text}</p> 
        `;
        weatherInfoBox1.innerHTML = `
        <p class="weather-info-ti">Humidity</p>
        <p>${data.humidity}%</p>
        `;
        weatherInfoBox2.innerHTML = `
        <p>Visibility</p>
        <p >${data.vis_km}KM</p>
        `;
        weatherInfoBox3.innerHTML = `
        <p>Pressure</p>
        <p >${data.pressure_mb} mb</p>
        `;
      }
    });
  });
});
