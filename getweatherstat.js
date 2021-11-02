var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

getJSON('https://weather.pacq.workers.dev/',
function(err, data) {
  if (err !== null) {
	console.log("Something went wrong: " + err)
  } else {
		//Chech if access token is ok
		if (data.code == 3) {
			if (confirm("Access token has expired. Ok to refresh?")) {
				location.reload()
			}
			return
		}

		// outdoor data
		document.getElementById("outsideTemp").textContent = Number(data[0].modules[0].temp).toFixed(1)
		document.getElementById("minOutsideTemp").textContent = data[0].modules[0].min_temp
		document.getElementById("maxOutsideTemp").textContent = data[0].modules[0].max_temp
		document.getElementById("pressure").textContent = data[0].pressure
		document.getElementById("outsideHumidity").textContent = data[0].modules[0].humidity
		document.getElementById("rain").textContent = data[0].modules[2].rainToday
		
		// indoor data 1
		document.getElementById("indoorTemp1").textContent = Number(data[0].temp).toFixed(1)
		document.getElementById("minIndoorTemp1").textContent = data[0].min_temp
		document.getElementById("maxIndoorTemp1").textContent = data[0].max_temp
		document.getElementById("indoorCO21").textContent = data[0].CO2
		document.getElementById("indoorNoise").textContent = data[0].noise
		document.getElementById("indoorHumidity1").textContent = data[0].humidity

		// trend for outdoor temp
		let outTrend = data[0].modules[0].trend_temp
		const outTrendCaret = document.getElementById("outdoorTrend")
		if (outTrend == "up") {
			outTrendCaret.className = "bi bi-caret-up-fill"
		}else if (outTrend == "down") {
			outTrendCaret.className = "bi bi-caret-down-fill"
		}

		// trend for indoor temp 1
		let indoorTempTrend1 = data[0].trend_temp
		const indoorTempTrend1Caret = document.getElementById("indoorTempTrend1")
		if (indoorTempTrend1 == "up") {
			indoorTempTrend1Caret.className = "bi bi-caret-up-fill"
		}else if (indoorTempTrend1 == "down") {
			indoorTempTrend1Caret.className = "bi bi-caret-down-fill"
		}

		//trend for pressure
		let pressureTrend = data[0].trend_pressure
		const pressureTrendCaret = document.getElementById("pressureTrendCaret")
		if (pressureTrend == "up") {
			pressureTrendCaret.className = "bi bi-caret-up-fill"
		}else if (pressureTrend == "down") {
			pressureTrendCaret.className = "bi bi-caret-down-fill"
		}

		// const theSvg = document.getElementById("svg")
		// theSvg.setAttribute("transform", "rotate(180)");
  }
});