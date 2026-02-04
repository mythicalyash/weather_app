const input = document.getElementById("input");
const btn = document.getElementById("searchBtn");

btn.addEventListener("click", () => {
    const city = input.value.trim();
    
    if (!city) {
        alert("Please enter a location");
        return;
    }
    
    input.value = "";
    
    fetchWeather(city)
        .then(data => {
            console.log("Weather data:", data);
            updateDOM(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert("Could not fetch weather data. Please try again.");
        });
});

async function fetchWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=3191792794cf460aab065118262301&q=${location}&aqi=no`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`Location not found or API error (${response.status})`);
    }
    
    const jsonData = await response.json();
    return jsonData;
}

function updateDOM(data) {
    const temp = data.current.temp_c;
    const location = data.location.name;
    const timeData = data.location.localtime; // "2026-01-23 12:24"
    const [date, time] = timeData.split(" ");
    const iconUrl = data.current.condition.icon;
    const conditionText = data.current.condition.text;
    
    console.log(temp, location, date, time, iconUrl, conditionText);
    
    // Dom elements selection
    const temperatureEl = document.querySelector(".temperature p");
    const cityEl = document.querySelector(".city p");
    const timeEl = document.querySelector(".time");
    const dateEl = document.querySelector(".date");
    const iconImg = document.querySelector("#icon");
    const conditionEl = document.querySelector(".condition");
    
    //  day name 
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dateObj = new Date(date);
    const dayName = dayNames[dateObj.getDay()];
    
    // Dom elements updation
    if (temperatureEl) temperatureEl.textContent = temp + "°C";
    if (cityEl) cityEl.textContent = location;
    if (timeEl) timeEl.textContent = time;
    if (dateEl) dateEl.textContent = date;
    if (document.querySelector(".day")) document.querySelector(".day").textContent = dayName;
    if (iconImg) iconImg.src = "https:" + iconUrl;
    if (conditionEl) conditionEl.textContent = conditionText;
}
