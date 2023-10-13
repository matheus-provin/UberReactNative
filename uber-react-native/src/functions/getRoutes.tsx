import polyline from '@mapbox/polyline'

export default async function getRoutes(origin: string, destination: string) {
    const api= `AIzaSyB9kRda0W-ik0spPoOIPTQJ4_veqAMIj5w`
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${api}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.routes || data.routes.length === 0) {
            throw new Error('No routes found.');
        }

        const routeCoordinates = data.routes[0].overview_polyline.points;
        const decodedCoordinates = polyline.decode(routeCoordinates);

        return decodedCoordinates;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null; // Handle the error as needed in your application
    }
}