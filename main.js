var api = {
	key: "bc9b295be9ce0260384f68b93953cbdb",
	base: "https://api.openweathermap.org/data/2.5/"
};

var searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
	if (evt.keyCode == 13) {
		getResults(searchbox.value);
	}
}

function getResults(query) {
	fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchbox.value + '&units=metric&appid=bc9b295be9ce0260384f68b93953cbdb')
		.then(weather => {
			return weather.json();
		}).then(displayResults);
}


function displayResults(weather) {

	var city = document.querySelector('.location .city');
	city.innerText = `${weather.name}, ${weather.sys.country}`;

	var now = new Date();
	var date = document.querySelector('.location .date');
	date.innerText = dateBuilder(now);

	var temp = document.querySelector('.current .temp');
	temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

	var weather_el = document.querySelector('.current .weather');
	weather_el.innerText = weather.weather[0].main;

	var hilow = document.querySelector('.hi-low');
	hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°`;
	switch (weather.weather[0].main) {
		case 'Rain':
		case 'Drizzle':
		case 'Mist':
			document.body.style.backgroundImage = 'url("photos/rain.jpg")';
			break;
		case 'Clear':
			document.body.style.backgroundImage = 'url("photos/clear.jpg")';
			break;
		case 'Clouds':
		case 'Smoke':
		case 'Haze':
			document.body.style.backgroundImage = 'url("photos/cloudy.jpg")';
			break;
		case 'Thunderstorm':
			document.body.style.backgroundImage = 'url("photos/strom.jpg")';
			break;
		case 'Snow':
			document.body.style.backgroundImage = 'url("photos/snow.jpg")';
			break;
		default:	
		document.body.style.backgroundImage = 'url("photos/default.jpg")';
		

	}
}

function dateBuilder(d) {
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	var day = days[d.getDay()];
	var date = d.getDate();
	var month = months[d.getMonth()];
	var year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}
