async function getweather() {
  const city = document.getElementById("city").value.trim();
  const { lat, lon } = await getgeoloc(city);

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=560bfdfdfce966e66cb91bfdfd42091f`
  );
  const data = await response.json();

  document.getElementById("Weatherdata").innerHTML = `
                        <div>
                        <p> Temeperature : ${(data.main.temp - 273.14).toFixed(2)}°C</p>
                        <p> Humidity : ${data.main.humidity}%</p>
                        <p> Description : ${data.weather[0].discription}</p>
                        </div>
                        
                        <img src="https://openweathermap.org/img/wn/${
                          data.weather[0].icon
                        }@2x.png" alt="warthericon">
                        
                    
    `;
}

async function getgeoloc(city) {
  console.log(city);

  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=560bfdfdfce966e66cb91bfdfd42091f`
  );

  const data = await response.json();

  const lat = data[0].lat;
  const lon = data[0].lon;

  return { lat, lon };
}
