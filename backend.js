import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function fetchNewsFromBackend(country, category) {
  const response = await axios.get("https://newsapi.org/v2/top-headlines", {
    params: {
      apiKey: process.env.NEWS_API_KEY,
      country: country,
      category: category,
    },
  });

  return response.data.articles;
}

export async function fetchLocationsSuggestionsFromBackend(inputText) {
  const response = await axios.get("http://api.weatherapi.com/v1/search.json", {
    params: {
      key: process.env.WEATHER_API_KEY,
      q: inputText,
    },
  });
  const suggestions = response.data;
  return suggestions;
}

export async function fetchCitiesFromBackend() {
  const jsonValue = await AsyncStorage.getItem("cities");
  const cities = jsonValue ? JSON.parse(jsonValue) : [];
  return cities;
}

export async function addCityToBackend(cityName) {
  const oldCities = await fetchCitiesFromBackend();
  const newCities = [...oldCities, cityName];
  const stringValue = JSON.stringify(newCities);
  await AsyncStorage.setItem("cities", stringValue);
}

export async function deleteCityFromBackend(cityName) {
  const oldCities = await fetchCitiesFromBackend();
  const newCities = oldCities.filter((city) => city !== cityName);
  const stringValue = JSON.stringify(newCities);
  await AsyncStorage.setItem("cities", stringValue);
}

export async function getWeatherDataFromBackend(cityName) {
  const response = await axios.get(
    "http://api.weatherapi.com/v1/forecast.json",
    {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: cityName,
        days: 7,
        aqi: "yes",
        alerts: "no",
      },
    }
  );
  return response.data;
}
