import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import {
  fetchLocationsSuggestionsFromBackend,
  getWeatherDataFromBackend,
} from "../backend";
import MapView, { Marker } from "react-native-maps";
import {
  reverseGeocodeAsync,
  useForegroundPermissions,
  getCurrentPositionAsync,
  PermissionStatus,
} from "expo-location";
import { WeatherContext } from "../store/weather-context";
import { useNavigation } from "@react-navigation/native";
import IconButton from "../components/ui/IconButton";

export default function AddLocation() {
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");
  const { addCity } = useContext(WeatherContext);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          name="save-outline"
          size={24}
          color={tintColor}
          onPress={() => {
            if (!city) {
              Alert.alert(
                "Invalid city",
                "Please select a city from suggestions."
              );
            } else {
              addCity(city);
              navigation.goBack();
            }
          }}
          style={{ marginHorizontal: 15 }}
        />
      ),
    });
  }, [city]);

  useEffect(() => {
    async function fetchSuggestions() {
      const suggestions = await fetchLocationsSuggestionsFromBackend(inputText);
      setSuggestions(suggestions);
    }
    if (inputText.trim() !== "") fetchSuggestions();
  }, [inputText]);

  function inputChangeHandler(enteredText) {
    setInputText(enteredText);
  }

  async function selectSuggestion(name) {
    setSuggestions([]);
    setInputText(name);
    setCity(name);
    const data = await getWeatherDataFromBackend(name);
    console.log(data);
    setLocation({
      latitude: data.location.lat,
      longitude: data.location.lon,
    });
  }

  const verifyPermission = async () => {
    if (
      locationPermissionInfo.status === PermissionStatus.UNDETERMINED ||
      locationPermissionInfo.status === PermissionStatus.DENIED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert(
        "Cannot continue",
        "Permission to access location is denied."
      );
      return;
    }
    const location = await getCurrentPositionAsync();
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    const address = await reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    const city = address[0].city;
    setCity(city);
    setInputText(city);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Search for a location"
          value={inputText}
          onChangeText={inputChangeHandler}
          style={styles.textInput}
        />
        {suggestions.length > 0 && (
          <View style={styles.suggestionsOverlay}>
            <ScrollView style={styles.suggestionsContainer}>
              {suggestions.map((suggestion) => (
                <Pressable
                  key={suggestion.id}
                  style={styles.suggestion}
                  onPress={() => selectSuggestion(suggestion.name)}
                >
                  <Text style={styles.suggestionText}>{suggestion.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <MapView
        style={styles.map}
        region={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }
            : {
                latitude: 37.78825, // Default location
                longitude: -122.4324,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }
        }
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={city}
          />
        )}
      </MapView>
      <IconButton
        name="navigate-outline"
        size={24}
        onPress={getLocationHandler}
        style={{
          borderRadius: 240,
          borderWidth: 2,
          borderColor: "black",
          padding: 12,
          marginVertical: 10,
        }}
      />
      <Text>Or, Locate Yourself!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 20,
    textAlign: "center",
  },
  textInputContainer: {
    width: "100%",
    maxWidth: 400,
    position: "relative",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    zIndex: 1,
  },
  suggestionsOverlay: {
    position: "absolute",
    top: 55,
    width: "100%",
    maxHeight: 150,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 2,
  },
  suggestionsContainer: {
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  suggestion: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  suggestionText: {
    fontSize: 16,
    color: "#333",
  },
  locateButton: {
    marginTop: 20,
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    maxWidth: 200,
  },
  map: {
    marginTop: 20,
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    maxWidth: 200,
  },
});
