async function getFamousPlacesByLatLon(lat, lon, radius = 10000) {
    const kinds =
        "cultural,architecture,historic,monuments_and_memorials,museums";
    const endpoint = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&rate=3&lon=${lon}&lat=${lat}&apikey=${process.env.OPEN_TRIP_MAP_API_KEY}&limit10`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const places = data.features;
        const uniqueNames = new Set();

        places.forEach((place) => {
            const name = place.properties.name;
            if (name) {
                uniqueNames.add(name);
            }
        });
        console.log("returning places");
        return Array.from(uniqueNames);
    } catch (error) {
        console.error("Error fetching tourist places:", error);
    }
}

async function getCoordsFromCity(cityName) {
    let response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
    );

    const data = await response.json();
    if (data.length == 0) {
        return false;
    }
    console.log("got cords");
    return { lat: data[0].lat, lon: data[0].lon };
}

const getNearbyPlaces = async (req, res) => {
    const city = req.params.city;
    if (!city) {
        return res.status(401).json({ status: "invalid city name" });
    }
    const { lat, lon } = await getCoordsFromCity(city);
    if (lat && lon) {
        const places = await getFamousPlacesByLatLon(lat, lon);
        if (places) return res.status(200).json(places);
    } else {
        console.log("error");
        return res.status(404).json({});
    }
};

module.exports = { getNearbyPlaces };
