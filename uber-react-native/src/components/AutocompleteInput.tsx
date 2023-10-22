import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {TextInput, View, StyleSheet, Dimensions} from "react-native";
const { width, height } = Dimensions.get("screen");

interface AutocompleteInputComponentProps {
  onChangeText: (text: string) => void;
  onLocationSelect: (lat: number, lng: number) => void;
}



const AutocompleteInputComponent: React.FC<AutocompleteInputComponentProps> = ({ onChangeText, onLocationSelect }) => {
    return (
      <View style={styles.container}>        
      <GooglePlacesAutocomplete
        placeholder='Search'
        onPress={(data, details = null) => {
          if (details) {
            const { location } = details.geometry;
            // console.log(`firstcall`,typeof location.lat, typeof location.lng)
            onLocationSelect(location.lat, location.lng);
          }
        }}
        fetchDetails={true}
        query={{
          key: 'AIzaSyB9kRda0W-ik0spPoOIPTQJ4_veqAMIj5w',
          language: 'pt',
          components: 'country:br',
        }}
        textInputProps={{
          InputComp: TextInput,
          onChangeText,
        }}
      />
      </View>
    );
  };

  export default AutocompleteInputComponent

  const styles = StyleSheet.create({
    container: {
      width: width
    },
    googleInputContainer: {
      width: width / 1.3,
      backgroundColor: 'red'
    }
  })