const apiKey = "154278f9368b6f174a56119263e386c4"
const units = "metric"

getLocationAndWeather()

//Get by Geolocation
function getLocationAndWeather() {
  if (navigator.geolocation) {
    //navigator.geolocation.getCurrentPosition(showPosition)
    navigator.geolocation.getCurrentPosition(wheatherByGeolocation)
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function wheatherByGeolocation(position) {
  const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=" + units + "&appid=" + apiKey
  console.log("URL geo: " + url)

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      showResult(data)
    })
    .catch(() => {
      console.log("City not found");
      document.getElementById("showResultText").style.display = "none"
      document.getElementById("msgNotFound").style.display = "block"
    })
}

function showPosition(position) {
  console.log(position.coords)
}

//Search city
const submitBtn = document.getElementById("submitCity")
submitBtn.addEventListener("click", function(event) {
  var cityToFind = document.getElementById("cityToFind")
  console.log("City to find:" + cityToFind.value)

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityToFind.value + "&units=" + units + "&appid=" + apiKey
  console.log("URL:" + url)

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      showResult(data)
    })
    .catch(() => {
      console.log("City not found");
      document.getElementById("showResultText").style.display = "none"
      document.getElementById("msgNotFound").style.display = "block"
    })
})

//Show results
function showResult(data) {
  document.getElementById("showResultText").style.display = "block"
  document.getElementById("msgNotFound").style.display = "none"
  const cityName = document.getElementById("cityName")
  const cityTemp = document.getElementById("cityTemp")
  const cityMaxTemp = document.getElementById("cityMaxTemp")
  const cityMinTemp = document.getElementById("cityMinTemp")
  cityName.textContent = data.name + ", " + data.sys.country
  cityTemp.textContent = "Temperature: " + data.main.temp + " °C"
  cityMaxTemp.textContent = "Max Temperature: " + data.main.temp_max + "°C"
  cityMinTemp.textContent = "Min Temperature: " + data.main.temp_min + "°C"
}
