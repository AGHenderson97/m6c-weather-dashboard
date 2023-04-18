// Initialize variables
var apiKey = "YOUR_API_KEY_HERE";
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
var currentCity = "";

// Function to display current weather for a city
function displayCurrentWeather(city) {
    // Construct the query URL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;