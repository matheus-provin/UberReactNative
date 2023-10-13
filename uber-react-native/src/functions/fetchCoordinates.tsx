import { api } from "../screens/HomeScreen";

export default async function fetchCoordinates(streetName: string) {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            streetName
          )}&key=${api}`
          )
}