import { useState } from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import AutocompleteInputComponent from "../components/AutocompleteInput";
import ChooseDestination from "../components/ChooseDestinaton";
import MapBackground from "../components/MapBackground";
import SearchBar from "../components/SearchBar";
export const api = "AIzaSyB9kRda0W-ik0spPoOIPTQJ4_veqAMIj5w"

export default function HomeScreen() {
  //TODO = implementar lugares como casa, trabalho. https://www.npmjs.com/package/react-native-google-places-autocomplete
  const [switchHud, setSwitchHud] = useState<boolean>(false)
  const [originCoordinates, setOriginCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false)
  
  const onCoordinatesSelect = (origin: { lat: number; lng: number } | null, destination: { lat: number; lng: number } | null) => {
    setOriginCoordinates(origin);
    setDestinationCoordinates(destination);
  };
  

  return (
    <View style={{ flex: 1 }}>
      <MapBackground 
        originCoordinates={originCoordinates}
        destinationCoordinates={destinationCoordinates} 
        isButtonPressed={isButtonPressed}
        />
      <View style={switchHud ? styles.searchBarContainer : styles.adressContainer}>
      {switchHud ? <ChooseDestination setSwitchHud={setSwitchHud} onCoordinatesSelect={onCoordinatesSelect} setIsButtonPressed={setIsButtonPressed} /> : <SearchBar setSwitchHud={setSwitchHud} />}
        {}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    position: "absolute",
    alignItems: "center",
    left: 0,
    right: 0,
  },
  adressContainer: {
    marginTop: 20,
    position: "absolute",
    alignItems: "center",
    left: 0,
    right: 0,
  }
});
