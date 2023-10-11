import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import MapBackground from "../components/MapBackground";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MapBackground />
      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    position: "absolute",
    marginTop: 20,
    alignItems: "center",
    left: 0,
    right: 0,
  },
});
