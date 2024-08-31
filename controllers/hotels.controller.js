const getHotelsByCity = async (req, res) => {
    const endpoint =
        "http://test.api.amadeus.com/reference-data/locations/hotels/by-city?cityCode=NCE&radius=1";

    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
    return res.json(data);
};

module.exports = { getHotelsByCity };
