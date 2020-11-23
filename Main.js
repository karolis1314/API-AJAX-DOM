var $ = function (id) { return document.getElementById(id); };




// Todays date
Date.prototype.today = function () {
	return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
}
// Time now
Date.prototype.timeNow = function () {
	return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}
//current date and time
var date_time = "LastSync: " + new Date().today() + " @ " + new Date().timeNow();

//coordinates
navigator.geolocation.getCurrentPosition(function (position) {
	lat = position.coords.latitude;
	long = position.coords.longitude;

});


//location function
var getLoc = function () {

	const key = "d61ca5e19c194838765cc5a6d2dbbb8b";
	var request = new XMLHttpRequest();
	if (request) {
		request.onreadystatechange = function () {
			locationBuild(request);
		};

		request.open('GET', `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`, true);
		request.send(null);
	}
}
//city location
var getCity = function () {

	const key = "d61ca5e19c194838765cc5a6d2dbbb8b";
	let city = $("city").value;
	var request = new XMLHttpRequest();
	if (request) {
		request.onreadystatechange = function () {
			cityBuild(request);
		};

		request.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`, true);
		request.send(null);


	}
}

//get hourly
var getHourly = function () {

	const key = "d61ca5e19c194838765cc5a6d2dbbb8b";
	let city = $("city").value;

	var request = new XMLHttpRequest();
	if (request) {
		request.onreadystatechange = function () {
			hourlybuild(request);
		};

		request.open('GET', `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${key}`, true);
		request.send(null);


	}
}
//location build
var locationBuild = function (request) {
	if (request.readyState == 4) {
		if (request.status == 200 || request.status == 304) {
			var response = JSON.parse(request.responseText);
			console.log(response);

			var name_city = response["name"];
			var main_temp = (response.main["temp"]).toFixed(0) + "K";
			var description = response.weather[0]["description"];
			var kelvin_to_celcius = (response.main["temp"] - 273.15).toFixed(0) + "C";
			var speed = response.wind["speed"];
			var iconID = response.weather[0]["icon"];
			var onClickTemp = main_temp;
			var onClickTemp1 = kelvin_to_celcius;

			//converting to upper case
			firstChar = description.substring(0, 1).toUpperCase();
			tail = description.substring(1);
			description = firstChar + tail;

			//getting icon
			var icon = `http://openweathermap.org/img/wn/${iconID}@2x.png`;



			//console.log(speed);

			var html = "<h2>" + name_city + "</h2>";
			html += '<p id ="description">' + "Today looks like it will be: " + description + "." + '</p>';
			html += '<p id="temp_kelv">' + "Today's temprature is: " + onClickTemp + '</p>';
			html += '<p id="wind_prop">' + "Today's Wind's speed is: " + speed + "m/s" + '</p>';
			html += "<img 'id= imageOfW' src= " + icon + ">";
			html += '<h3>' + date_time + '</h3>';
			$("data").innerHTML = html;
			var html2 = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d76080.78892980507!2d-8.001544391291311!3d53.42332685912475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485c49013e648c9f%3A0xdaf91a8d46bde380!2sAthlone%2C%20Co.%20Vestmidas!5e0!3m2!1slt!2sie!4v1605633073804!5m2!1slt!2sie" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>'
			$("map").innerHTML = html2;

			$("button3").addEventListener('click', () => {
				if (onClickTemp == main_temp) {
					var html = "<h2>" + name_city + "</h2>";
					html += '<p id ="description">' + "Today looks like it will be: " + description + "." + '</p>';
					html += '<p id="temp_kelv">' + "Today's temprature is: " + kelvin_to_celcius + '</p>';
					html += '<p id="wind_prop">' + "Today's Wind's speed is: " + speed + "m/s" + '</p>';
					html += "<img 'id= imageOfW' src= " + icon + ">";
					html += '<h3>' + date_time + '</h3>';
					$("data").innerHTML = html;
				}
			});

			$("button4").addEventListener('click', () => {
				if (onClickTemp1 == kelvin_to_celcius) {
					var html = "<h2>" + name_city + "</h2>";
					html += '<p id ="description">' + "Today looks like it will be: " + description + "." + '</p>';
					html += '<p id="temp_kelv">' + "Today's temprature is: " + main_temp + '</p>';
					html += '<p id="wind_prop">' + "Today's Wind's speed is: " + speed + "m/s" + '</p>';
					html += "<img 'id= imageOfW' src= " + icon + ">";
					html += '<h3>' + date_time + '</h3>';
					$("data").innerHTML = html;
				}
			});

		}
		else {

			console.log("Error in network request: " + request.statusText);

		}
	}
}


//city build page
var cityBuild = function (request) {
	if (request.readyState == 4) {
		if (request.status == 200 || request.status == 304) {
			var response = JSON.parse(request.responseText);
			console.log(response);

			var name_city = response["name"];
			var main_temp = (response.main["temp"]).toFixed(0) + "K";
			var description = response.weather[0]["description"];
			var kelvin_to_celcius = (response.main["temp"] - 273.15).toFixed(0) + "C";
			var speed = response.wind["speed"];
			var iconID = response.weather[0]["icon"];
			var onClickTemp = main_temp;
			var onClickTemp1 = kelvin_to_celcius;

			//converting to upper case
			firstChar = description.substring(0, 1).toUpperCase();
			tail = description.substring(1);
			description = firstChar + tail;

			//getting icon
			var icon = `http://openweathermap.org/img/wn/${iconID}@2x.png`;



			//console.log(speed);

			var html = "<h2>" + name_city + "</h2>";
			html += '<p id ="description">' + "Today looks like it will be: " + description + "." + '</p>';
			html += '<p id="temp_kelv">' + "Today's temprature is: " + onClickTemp + '</p>';
			html += '<p id="wind_prop">' + "Today's Wind's speed is: " + speed + "m/s" + '</p>';
			html += "<img 'id= imageOfW' src= " + icon + ">";
			html += '<h3>' + date_time + '</h3>';
			var html2 = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152515.25333588192!2d-6.385785668716212!3d53.32444313798125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e80ea27ac2f%3A0xa00c7a9973171a0!2sDublin!5e0!3m2!1sen!2sie!4v1605701762611!5m2!1sen!2sie" width="800" height="600" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>';
			$("map").innerHTML = html2;



			$("data").innerHTML = html;
			$("button3").addEventListener('click', () => {
				if (onClickTemp == main_temp) {
					var html = "<h2>" + name_city + "</h2>";
					html += '<p id ="description">' + "Today looks like it will be: " + description + "." + '</p>';
					html += '<p id="temp_kelv">' + "Today's temprature is: " + kelvin_to_celcius + '</p>';
					html += '<p id="wind_prop">' + "Today's Wind's speed is: " + speed + "m/s" + '</p>';
					html += "<img 'id= imageOfW' src= " + icon + ">";
					html += '<h3>' + date_time + '</h3>';
					$("data").innerHTML = html;
				}
			});

			$("button4").addEventListener('click', () => {
				if (onClickTemp1 == kelvin_to_celcius) {
					var html = "<h2>" + name_city + "</h2>";
					html += '<p id ="description">' + "Today looks like it will be: " + description + "." + '</p>';
					html += '<p id="temp_kelv">' + "Today's temprature is: " + main_temp + '</p>';
					html += '<p id="wind_prop">' + "Today's Wind's speed is: " + speed + "m/s" + '</p>';
					html += "<img 'id= imageOfW' src= " + icon + ">";
					html += '<h3>' + date_time + '</h3>';
					$("data").innerHTML = html;
				}
			});

		}
		else {
			if (request.status == 404 || request.status == 400) {
				alert("No city or emty field found.")
			}
			console.log("Error in network request: " + request.statusText);

		}
	}
}

//hourly
var hourlybuild = function (request) {
	if (request.readyState == 4) {
		if (request.status == 200 || request.status == 304) {
			var response = JSON.parse(request.responseText);
			console.log(response);

			var day1 = (response.daily[0]["temp"]["day"]- 273.15).toFixed(0);
			var day2 = (response.daily[1]["temp"]["day"]- 273.15).toFixed(0);
			var day3 = (response.daily[2]["temp"]["day"]- 273.15).toFixed(0);
			var day4 = (response.daily[3]["temp"]["day"]- 273.15).toFixed(0);
			var day5 = (response.daily[4]["temp"]["day"]- 273.15).toFixed(0);
			var day6 = (response.daily[5]["temp"]["day"]- 273.15).toFixed(0);
			var day7 = (response.daily[6]["temp"]["day"]- 273.15).toFixed(0);
		

			const chartforme = $("myChart").getContext('2d');
			const barChart = new Chart(chartforme, {
				type: 'bar',
				data: {
					labels: ['Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
					datasets: [{
						label: 'Past Weeks temparature of your location at day time in C',
						data: [day1, day2, day3, day4, day5, day6, day7],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});

			var speed1 = response.daily[0]["wind_speed"];
			var speed2 = response.daily[1]["wind_speed"];
			var speed3 = response.daily[2]["wind_speed"];
			var speed4 = response.daily[3]["wind_speed"];
			var speed5 = response.daily[4]["wind_speed"];
			var speed6 = response.daily[5]["wind_speed"];
			var speed7 = response.daily[6]["wind_speed"];

			const anotherOne = $("myChart2").getContext('2d');
			const kita = new Chart(anotherOne, {
				type: 'bar',
				data: {
					labels: ['Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
					datasets: [{
						label: 'Past weeks wind speed in Meters per Second (m/s)',
						data: [speed1, speed2, speed3, speed4, speed5, speed6, speed7],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
					}]
				},
				options: {
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});

			
			
		}
		else {
	if (request.status == 404 || request.status == 400) {
		alert("No city or emty field found.")
	}
	console.log("Error in network request: " + request.statusText);

}
	}
}






//button functions
window.onload = function () {

	$("button").onclick = getCity;
	$("button1").onclick = getLoc;
	$("button5").onclick = getHourly;

}