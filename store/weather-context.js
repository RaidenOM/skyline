import { createContext, useState } from "react";
import {
  fetchCitiesFromBackend,
  addCityToBackend,
  deleteCityFromBackend,
} from "../backend";

export const WeatherContext = createContext();

export function WeatherContextProvider({ children }) {
  const [allCities, setAllCities] = useState([]);
  async function fetchCities() {
    const cities = await fetchCitiesFromBackend();
    setAllCities(cities.reverse());
  }

  async function addCity(cityName) {
    if (!allCities.includes(cityName)) {
      await addCityToBackend(cityName);
      fetchCities();
    }
  }

  async function deleteCity(cityName) {
    await deleteCityFromBackend(cityName);
    fetchCities();
  }

  return (
    <WeatherContext.Provider
      value={{ allCities, fetchCities, addCity, deleteCity }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
