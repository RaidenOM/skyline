import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { WeatherContext } from "../../store/weather-context";

export default function CityListItem({ cityName }) {
  const navigation = useNavigation();
  const { deleteCity } = useContext(WeatherContext);
  return (
    <View style={styles.outerContainer} key={cityName}>
      <Pressable
        style={styles.container}
        android_ripple={{ color: "#ccc" }}
        onPress={() => {
          navigation.navigate("ViewWeather", { cityName });
        }}
        onLongPress={() => deleteCity(cityName)}
      >
        <Text>{cityName}</Text>
        <Ionicons name="arrow-forward-outline" size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  outerContainer: {
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 4,
    overflow: "hidden",
  },
});
