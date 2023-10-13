import React, { useState } from "react";
import { View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AutocompleteInput from "./AutocompleteInput";

const { width, height } = Dimensions.get("screen");

export default function SearchBar({ setSwitchHud }: { setSwitchHud: (arg0: boolean) => void }) {

  return (
    <View  style={styles.container}>
       <TouchableOpacity onPress={() => setSwitchHud(true)} style={styles.innerContainer}>
        <Ionicons name="search" size={24} color="gray" style={styles.icon} />
        <Text>  
            Qual seu destino hoje?
        </Text>
      </TouchableOpacity> 
    </View>
  );
}
//
const styles = StyleSheet.create({
  container: {
    width: width / 1.25,
    height: 80,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    width: "90%",
    height: "70%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
});
