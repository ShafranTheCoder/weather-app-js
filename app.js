window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let degreeSection = document.querySelector('.degree-section');
  const temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';

      const api = `${proxy}https://api.darksky.net/forecast/9293dd9ef6c5d8124b0b15a786be6651/${lat},${long}`;
      fetch(api).then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {
            temperature,
            summary,
            icon
          } = data.currently; //Set DOM Elements from the API
          ///formula for celc
          let celcius = (temperature - 32) * (5 / 9);
          temperatureDegree.textContent = Math.floor(celcius);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //set icons 
          setIcons(icon, document.querySelector('.icon'));
          // Farenheit to Cels
          degreeSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celcius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          })
        })
    });

  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({
      color: "white"
    });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon])
  }
});