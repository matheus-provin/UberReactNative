import React, { useState } from "react";
import { View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Autocomplete from "react-native-autocomplete-input";
import { fetchSuggestions } from "../services/PlacesSuggestions";

const { width, height } = Dimensions.get("screen");

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const selectSuggestion = (item: string) => {
    setQuery(item);
    setSuggestions([]); // Clear suggestions when an item is selected
  };
  return (
    <View style={styles.container}>
      <Autocomplete
        data={suggestions}
        defaultValue={query}
        onChangeText={(text: string) => {
          setQuery(text);
          fetchSuggestions(text, setSuggestions);
        }}
        renderTextInput={(props) => (
          <View style={styles.innerContainer}>
            <Ionicons name="search" size={24} color="gray" style={styles.icon} />
            <TextInput
              placeholder="Para onde vamos hoje?"
              style={styles.input}
              placeholderTextColor="gray"
              {...props}
            />
          </View>
        )}
        // ... Other props ...
      />
      <View style={styles.innerContainer}>
        <Ionicons name="search" size={24} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Para onde vamos hoje?"
          style={styles.input}
          placeholderTextColor="gray"
        />
      </View>
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
