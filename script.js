async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "fdbf4b7d1144418aa5782712262303";

    const errorMsg = document.getElementById("errorMsg");

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // If city not found
        if (data.error) {
            errorMsg.innerText = "City not found. Please enter a valid city.";

            document.getElementById("cityName").innerText = "No data";
            document.getElementById("temp").innerText = "--";
            document.getElementById("humidity").innerText = "--";
            document.getElementById("condition").innerText = "--";
            document.getElementById("icon").src = "";

            return;
        }

        // Clear error
        errorMsg.innerText = "";

        // Show data
        document.getElementById("cityName").innerText = data.location.name;
        document.getElementById("temp").innerText = data.current.temp_c + "°C";
        document.getElementById("humidity").innerText = data.current.humidity + "%";
        document.getElementById("condition").innerText = data.current.condition.text;
        // document.getElementById("icon").src = "https:" + data.current.condition.icon;

    } catch (error) {
        errorMsg.innerText = "Unable to fetch data. Please try again.";
        console.log(error);
    }
}

// Enter key support
document.getElementById("city").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getWeather();
    }
});