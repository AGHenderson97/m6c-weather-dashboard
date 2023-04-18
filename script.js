// Initialize variables
var apiKey = "YOUR_API_KEY_HERE";
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
var currentCity = "";

// Function to display current weather for a city
function displayCurrentWeather(city) {
  // Construct the query URL
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

  // Make the API request
  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: "json",
    success: function(response) {
      // Set the currentCity variable
      currentCity = response.name;

      // Display the city name, date, and icon
      $("#city-name").text(response.name);
      $("#current-date").text(moment().format("MMM D, YYYY"));
      $("#current-icon").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");

      // Convert the temperature from Kelvin to Fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;

      // Display the temperature, humidity, and wind speed
      $("#current-temp").text(tempF.toFixed(1) + " °F");
      $("#current-humidity").text(response.main.humidity + "%");
      $("#current-wind").text(response.wind.speed + " MPH");

      // Display the UV index
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

      $.ajax({
        url: uvQueryURL,
        method: "GET",
        dataType: "json",
        success: function(uvResponse) {
          $("#current-uv").text(uvResponse.value);

          // Set the UV index background color based on its value
          if (uvResponse.value <3) {
            $("#current-uv").css("background-color", "green");
          } else if (uvResponse.value <6) {
            $("#current-uv").css("background-color", "yellow");
          } else if (uvResponse.value <8) {
            $("#current-uv").css("background-color", "orange");
          } else if (uvResponse.value <11) {
            $("#current-uv").css("background-color", "red");
          } else {
            $("#current-uv").css("background-color", "purple");
          }
        }
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Error: " + textStatus + " - " + errorThrown);
    }
  });
}

// Function to display the 5-day forecast for a city
function displayForecast(city) {
  // Construct the query URL
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

  // Make the API request
  $.ajax({
    url: queryURL,
    method: "GET",
    dataType: "json",
    success: function(response) {
      // Display the forecast cards
      for (var i = 0; i <response.list.length; i += 8) {
        // Calculate the date, icon, temperature, and humidity for the forecast card
        var date = moment(response.list[i].dt_txt).format("MMM D, YYYY");
        var icon = "https
