import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import getRoutes from "../functions/getRoutes";

const initialRegion = {
  latitude: -30.033056,  
  longitude: -51.230000,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};




const MapBackground = ({ originCoordinates, destinationCoordinates }: { originCoordinates: string; destinationCoordinates: string }) => {
  const [decodedCoordinates, setDecodedCoordinates] = useState<[number, number][]>([]);
  
  useEffect(() => {
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
      <Polyline 
      coordinates={decodedCoordinates.map(([latitude, longitude]) => ({
        latitude,
        longitude,
      }))}
      strokeColor="#FF0000" // Line color
      strokeWidth={3} // Line widt
      />
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
