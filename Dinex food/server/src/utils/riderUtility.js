import axios from "axios";

export const calculateDistance = async (orders, lat, lon) => {
  try {
    const ordersWithDistance = await Promise.all(
      orders.map(async (order) => {
        const restaurantLat = order.restaurantId.geoLocation.lat;
        const restaurantLon = order.restaurantId.geoLocation.lon;
        console.log("Restaurant Lat: ", restaurantLat, "Restaurant Lon: ", restaurantLon);
        const distance = await getDistanceFromLatLonInKm(
          lat,
          lon,
          restaurantLat,
          restaurantLon,
        );
        return {
          ...order._doc, // Spread the original order document
          distanceFromRider: distance,
        };
      }),
    );

    //sort on the basis of distance
    ordersWithDistance.sort((a, b) => a.distanceFromRider - b.distanceFromRider);

    return ordersWithDistance;
  } catch (error) {
    throw error;
  }
};

const getDistanceFromLatLonInKm = async (lat1, lon1, lat2, lon2) => {
  try {
    const DistanceMatrixAPIKey = process.env.DISTANCE_MATRIX_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lon1}&destinations=${lat2},${lon2}&mode=driving&key=${DistanceMatrixAPIKey}`;
    const res = await axios.get(url);
    return res.data.rows[0].elements[0].distance.value / 1000; // Return distance in km
  } catch (error) {
    throw error;
  }
};