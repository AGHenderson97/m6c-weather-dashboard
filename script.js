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
