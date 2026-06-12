const cityName = document.querySelector('.city-name');
const cityTime = document.querySelector('.city-time');
const cityTemp = document.querySelector('.city-temperature');
const cityCondition = document.querySelector('.weather-condition');
const cityWind = document.querySelector('.city-wind-value')
const cityHumidity = document.querySelector('.city-humidity-value');


const hourWeatherCards = document.querySelector('.hour-weather-cards');
const weeklyWeatherCards = document.querySelector('.weekly-weather-cards');

const parameters = {
  lat: '9.0820',
  lon: '8.6753',
  current: {
    currentTemp: 'temperature_2m',
    currentHumidity: 'relative_humidity_2m',
    currentWind: 'wind_speed_10m'
  },
  hourly: {
    hourlyTemp: 'temperature_2m',
    hourlyHumidity: 'relative_humidity_2m',
    hourlyWind: 'wind_speed_10m'
  }
}

const buildUrl = (param) =>{
  const currentUrl=
  `
    https://api.open-meteo.com/v1/forecast?
latitude=${param.lat}
&longitude=${param.lon}
&timezone=auto
&current=${param.current.currentTemp},${param.current.currentHumidity},${param.current.currentWind}
&hourly=${param.hourly.hourlyTemp},${param.hourly.hourlyHumidity},${param.hourly.hourlyWind}`;

  return currentUrl;
}

const getWeather = async ()=>{
  try{
    const url =  buildUrl(parameters);
    console.log(url)

    const response = await fetch(url);
    if(!response.ok){
      throw new Error('Failed to fetch weather')
    }
    const data = await response.json();

    
    console.log(data)
    console.log(data.current) 
    const currentTemperature = `${data.current.temperature_2m}${data.current_units.temperature_2m}`;
    const currentRelativeHumidity = `${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`;
    const currentWindSpeed = `${data.current.wind_speed_10m}${data.current_units.wind_speed_10m}`
    const timestamps = data.current.time
    const currentTime = formatTime(timestamps);
  

    const hourlyTempArray = data.hourly.temperature_2m
    

    console.log(currentTemperature)
    console.log(currentRelativeHumidity)
    console.log(currentWindSpeed)
    console.log(currentTime)

    cityTime.textContent = currentTime
    cityTemp.textContent = currentTemperature
    cityWind.textContent = currentWindSpeed
    cityHumidity.textContent = currentRelativeHumidity

    const temp = data.current.temperature_2m;

    if (temp > 30) {
      cityCondition.textContent = 'Hot';
    } else if (temp > 20 && temp < 30) {
      cityCondition.textContent = 'Warm';
    } else if (temp > 10 && temp < 20) {
      cityCondition.textContent = 'Cool';
    } else {
      cityCondition.textContent = 'Cold';
    }

    }catch(error){
      console.log(error)
    }
    
}

 const formatTime = (timestamp)=>{
  return new Date(timestamp).toLocaleTimeString([], {
    hour:'numeric',
    minute: '2-digit',
    hour12: true
  })
}



getWeather()

