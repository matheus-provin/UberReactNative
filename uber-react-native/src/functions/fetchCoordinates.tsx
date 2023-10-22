import { api } from "../screens/HomeScreen";

export default async function fetchCoordinates(streetName: string) {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            streetName
          )}&key=${api}`
          )
    const data = await response.json()
    if(data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location
        return {
            latitude: location.lat,
            longitude: location.lng
        }
    } else {
        return null
    }
}