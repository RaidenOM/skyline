import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { WeatherContext } from "../store/weather-context";
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import CityListItem from "../components/Weather/CityListItem";

export default function WeatherHome() {
  const { allCities, fetchCities } = useContext(WeatherContext);
  const isFocused = useIsFocused();

  useState(() => {
    fetchCities();
  }, [isFocused]);

  return (
    <ScrollView>
      {allCities.map((city) => (
        <CityListItem cityName={city} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
