import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { getWeatherDataFromBackend } from "../backend";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";

export default function ViewWeather() {
  const route = useRoute();
  const navigation = useNavigation();
  const { cityName } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: cityName });
  }, [cityName]);

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function getWeatherData() {
      const data = await getWeatherDataFromBackend(cityName);
      setWeatherData(data);
    }

    getWeatherData();
  }, []);

  if (!weatherData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading Weather Data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.cityName}>{cityName}</Text>

        <View style={styles.weatherContainer}>
          <Image
            source={{ uri: `https:${weatherData.current.condition.icon}` }}
            style={styles.weatherIcon}
          />
          <Text style={styles.temperature}>{weatherData.current.temp_c}°C</Text>
        </View>

        <Text style={styles.conditionText}>
          {weatherData.current.condition.text}
        </Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Wind Speed</Text>
            <Text style={styles.infoValue}>
              {weatherData.current.wind_kph} kph
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Wind Direction</Text>
            <Text style={styles.infoValue}>{weatherData.current.wind_dir}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Humidity</Text>
            <Text style={styles.infoValue}>
              {weatherData.current.humidity}%
            </Text>
          </View>
        </View>

        {/* 7-Day Forecast Scrollable Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.forecastContainer}
        >
          {weatherData.forecast.forecastday.map((day, index) => (
            <View key={index} style={styles.forecastCard}>
              <Text style={styles.forecastDate}>{day.date}</Text>
              <Image
                source={{ uri: `https:${day.day.condition.icon}` }}
                style={styles.forecastIcon}
              />
              <Text style={styles.forecastTemp}>
                {day.day.maxtemp_c}° / {day.day.mintemp_c}°
              </Text>
              <Text style={styles.forecastCondition}>
                {day.day.condition.text}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#f0f4f8",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  cityName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 10,
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
  temperature: {
    fontSize: 64,
    fontWeight: "300",
    color: "#1e3a8a",
    marginLeft: 10,
  },
  conditionText: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#374151",
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 16,
    color: "#6b7280",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e40af",
  },
  forecastContainer: {
    marginTop: 20,
  },
  forecastCard: {
    width: 150,
    height: 200,
    padding: 10,
    margin: 10,
    marginHorizontal: 5,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  forecastDate: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 5,
  },
  forecastIcon: {
    width: 40,
    height: 40,
    marginVertical: 5,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1e40af",
  },
  forecastCondition: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
});
