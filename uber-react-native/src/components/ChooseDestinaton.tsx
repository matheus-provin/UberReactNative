import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Button } from "react-native";
import fetchCoordinates from "../functions/fetchCoordinates";
import AutocompleteInputComponent from "./AutocompleteInput";

const { width, height } = Dimensions.get("screen");

interface ChooseDestinationProps {
  setSwitchHud: (arg0: boolean) => void;
  onCoordinatesSelect: (origin: { lat: number; lng: number } | null, destination: { lat: number; lng: number } | null) => void;
  setIsButtonPressed: (arg0: boolean) => void
}

export default function ChooseDestination({ setSwitchHud, onCoordinatesSelect, setIsButtonPressed}: ChooseDestinationProps) {
  const [originStreet, setOriginStreet] = useState("");
  const [destinationStreet, setDestinationStreet] = useState("");
  const [originCoordinates, setOriginCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const onTraceRoute = async () => {
    console.log(`inicou a ontraceroute`);

    const originPromise = fetchCoordinates(originStreet);
    const destinationPromise = fetchCoordinates(destinationStreet);

    const [originCoords, destinationCoords] = await Promise.all([originPromise, destinationPromise]);

    console.log(`origin`, originCoords);
    console.log(`destination`, destinationCoords);

    if (originCoords !== null) {
      setOriginCoordinates({ lat: originCoords.latitude, lng: originCoords.longitude });
      console.log(`originCoordinates`, originCoordinates, typeof originCoordinates);
    } else {
      setOriginCoordinates(null);
    }

    if (destinationCoords !== null) {
      setDestinationCoordinates({ lat: destinationCoords.latitude, lng: destinationCoords.longitude });
      console.log(`destinationCoordinates`, destinationCoordinates, typeof destinationCoordinates);
    } else {
      setDestinationCoordinates(null);
    }
  };

  useEffect(() => {
    onCoordinatesSelect(originCoordinates, destinationCoordinates);
  }, [originCoordinates, destinationCoordinates]);

  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}>
        <Text>Origem</Text>
        <View style={styles.firstInput}>
          <AutocompleteInputComponent
            onChangeText={(text) => setOriginStreet(text)}
            onLocationSelect={(lat, lng) => {
              setOriginCoordinates({ lat, lng });
            }}
          />
        </View>
      </View>
      <View style={styles.secondContainer}>
        <Text>Destino</Text>
        <View style={styles.secondInput}>
          <AutocompleteInputComponent
            onChangeText={(text) => {
              setDestinationStreet(text);
            }}
            onLocationSelect={(lat, lng) => {
              setDestinationCoordinates({ lat, lng });
            }}
          />
        </View>
      </View>
      <Button title="Ver rota" onPress={onTraceRoute} />
      <TouchableOpacity style={styles.exitButton} onPress={() => setSwitchHud(false)}>
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    minHeight: 150,
    backgroundColor: "#f2f2f2",
    paddingLeft: 10,
  },
  firstInput: {
    marginBottom: 10,
    marginTop: 5,
  },
  secondInput: {
    marginBottom: 10,
    marginTop: 5,
  },
  firstContainer: {
    marginTop: 10,
  },
  secondContainer: {},
  exitButton: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: `white`,
    justifyContent: `center`,
    alignItems: `center`,
    marginBottom: 10,
    left: `80%`,
  },
});
