import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import getRoutes from "../functions/getRoutes";

interface MapBackgroundProps {
  originCoordinates: { lat: number; lng: number } | null;
  destinationCoordinates: { lat: number; lng: number } | null;
  isButtonPressed: boolean;
}


const initialRegion = {
  latitude: -30.033056,  
  longitude: -51.230000,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapBackground = ({ originCoordinates, destinationCoordinates, isButtonPressed }: MapBackgroundProps) => {
  const [decodedCoordinates, setDecodedCoordinates] = useState<[number, number][]>([]);

  const fetchRoutes = async () => {
    try {
      const coordinates = await getRoutes(originCoordinates, destinationCoordinates);

      if (coordinates && coordinates.length > 0) {
        setDecodedCoordinates(coordinates);
      } else {
        console.log("No coordinates data received.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };
  
  useEffect(() => {
    console.log(`entrou no useEffect`)
    fetchRoutes();
  }, [originCoordinates, destinationCoordinates]);
  
  return (
    <View style={styles.container}>
      <MapView
       style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        initialRegion={initialRegion}
      >
      {isButtonPressed && (
        <Polyline 
          coordinates={decodedCoordinates.map(([latitude, longitude]) => ({
            latitude,
            longitude,
          }))}
          strokeColor="#FF0000" // Line color
          strokeWidth={3} // Line width
        />
      )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapBackground;
