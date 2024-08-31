const getHotelsByCity = async (req, res) => {
    const endpoint =
        "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=NCE&radius=1";
    const response = await fetch(endpoint, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    console.log(data);
    return res.json(data);
};

module.exports = { getHotelsByCity };
