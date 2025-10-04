const id = "9505fd1df737e20152fbd78cdb289b6a";
const baseUrl = "https://api.openweathermap.org/data/2.5/";
const weatherUrl = baseUrl + "weather?units=metric&appid=" + id;
const forecastUrl = baseUrl + "forecast?units=metric&appid=" + id;

const city = document.querySelector(".name");
const form = document.querySelector("form");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const valueSearch = document.getElementById("name");
const clouds = document.getElementById("clouds");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const main = document.querySelector("main");
const forecastContainer = document.querySelector(".forecast");

const windSpeed = document.getElementById("wind-speed");
const windGust = document.getElementById("wind-gust");
const windArrow = document.getElementById("wind-arrow");
// Map tên city
const cityMapping = {
  Turan: "Đà Nẵng",
  "Ho Chi Minh City": "TP. Hồ Chí Minh",
  Hanoi: "Hà Nội",
};

// Fetch weather hiện tại
const searchWeather = async () => {
  try {
    const res = await fetch(weatherUrl + "&q=" + valueSearch.value);
    const data = await res.json();

    if (data.cod == 200) {
      let cityName = data.name;
      if (cityMapping[cityName]) cityName = cityMapping[cityName];
      const cityCaption = city.querySelector("figcaption");
      if (cityCaption)
        cityCaption.innerHTML = cityName + ", " + data.sys.country;

      const cityImg = city.querySelector("img");
      if (cityImg)
        cityImg.src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;

      
      const weatherIcon = temperature.querySelector("img");
      if (weatherIcon) {
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      }

      const tempSpan = temperature.querySelector("span");
      if (tempSpan) tempSpan.innerText = data.main.temp.toFixed(1);

      if (description) description.innerText = data.weather[0].description;

      if (clouds) clouds.innerText = data.clouds.all + "%";
      if (humidity) humidity.innerText = data.main.humidity + "%";
      if (pressure) pressure.innerText = data.main.pressure + "hPa";

      // Wind
      if (data.wind) setWind(data.wind);
    } else {
      description.innerText = "Không tìm thấy thành phố!";
    }
  } catch (err) {
    console.error(err);
    description.innerText = "⚠️ Lỗi dữ liệu hoặc API!";
  }
  valueSearch.value = "";
};

// Gió
function setWind(wind) {
  windSpeed.innerText = (wind.speed * 3.6).toFixed(1); // m/s -> km/h
  windGust.innerText = wind.gust ? (wind.gust * 3.6).toFixed(1) : "—";
  windArrow.style.transform = `rotate(${wind.deg}deg)`;
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (valueSearch.value.trim() !== "") {
    searchWeather();
  }
});


const initApp = () => {
  valueSearch.value = "Da Nang";
  searchWeather();
};
initApp();


