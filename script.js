var searchButton = document.querySelector(".search button");
var searchBar = document.querySelector(".search-bar")

let weather = {

    apiKey: "",

    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
            )
             .then((response) => response.json())
             .then((data) => this.displayWeather(data))
             .catch((error) => {
                console.log(error);
   
                    searchBar.focus();
                    searchBar.style.backgroundColor = "#ee9b00";
                    searchBar.placeholder = "Sorry, we couldn't find this city: " + '"' + searchBar.value + '"';
                    searchBar.value = "";
            });
    },

    displayWeather: function(data){
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerHTML = "Weather in " + name;
    document.querySelector(".temp").innerHTML = Math.floor(temp) + "°C";
    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon +".png";
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerHTML = "Wind Speed: " + speed + "km/h";
    document.querySelector(".feels-like").innerHTML = "Feels Like: " + feels_like + "°C";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')"

    },

    search: function() {
       var searchBar = document.querySelector(".search-bar")
       this.fetchWeather(searchBar.value);
    }
};

searchButton.addEventListener("click",function(){
weather.search();
});

searchBar.addEventListener("keyup",function(event){
if (event.keyCode === 13) {
    weather.search();
}
});


weather.fetchWeather("Toronto");

