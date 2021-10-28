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

//getJSON('https://jsonmock.hackerrank.com/api/movies',
getJSON('https://weather.pacq.workers.dev/',
function(err, data) {
  if (err !== null) {
	console.log("Something went wrong: " + err)
  } else {
	console.log("Data reads: " + JSON.stringify(data))
	document.getElementById("outsideTemp").textContent = data[0].modules[0].temp
	document.getElementById("minOutsideTemp").textContent = data[0].modules[0].min_temp
	document.getElementById("maxOutsideTemp").textContent = data[0].modules[0].max_temp
	document.getElementById("pressure").textContent = data[0].pressure
	document.getElementById("outsideHumidity").textContent = data[0].modules[0].humidity
	document.getElementById("rain").textContent = data[0].modules[2].rainLastMeasured
  }
});