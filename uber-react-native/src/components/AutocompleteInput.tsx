import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {TextInput, View, StyleSheet, Dimensions} from "react-native";
const { width, height } = Dimensions.get("screen");

const AutocompleteInputComponent = () => {
    return (
      <View style={styles.container}>        
      <GooglePlacesAutocomplete
        placeholder='Search'
        onPress={(data, details = null) => {
          console.log(details?.geometry.location.lat);
        }}
        fetchDetails={true}
        query={{
          key: 'AIzaSyB9kRda0W-ik0spPoOIPTQJ4_veqAMIj5w',
          language: 'pt',
          components: 'country:br',
        }}
        textInputProps={{
          InputComp: TextInput,
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