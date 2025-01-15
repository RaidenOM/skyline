import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewsHome from "./screens/NewsHome";
import WeatherHome from "./screens/WeatherHome";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { NewsContextProvider } from "./store/news-context";
import { createStackNavigator } from "@react-navigation/stack";
import ViewNews from "./screens/ViewNews";
import IconButton from "./components/ui/IconButton";
import AddLocation from "./screens/AddLocation";
import { WeatherContextProvider } from "./store/weather-context";
import ViewWeather from "./screens/ViewWeather";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HeaderGradient() {
  return (
    <LinearGradient
      colors={["#9403fc", "#be03fc", "#fc03a5"]}
      style={{
        flex: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 10,
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  );
}

function TabBarGradient() {
  return (
    <LinearGradient
      colors={["#9403fc", "#be03fc", "#fc03a5"]}
      style={{
        flex: 1,
      }}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    />
  );
}

function NewsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerBackground: () => <HeaderGradient />,
        headerTintColor: "white",
        headerStyle: {
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
        },
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="NewsHome"
        component={NewsHome}
        options={{
          title: "News",
          headerLeft: () => (
            <Text style={{ color: "#fc03a5", marginHorizontal: 15 }}>
              Skyline
            </Text>
          ),
        }}
      />
      <Stack.Screen name="ViewNews" component={ViewNews} />
    </Stack.Navigator>
  );
}

function WeatherStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerBackground: () => <HeaderGradient />,
        headerTintColor: "white",
        headerStyle: {
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
        },
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="WeatherHome"
        component={WeatherHome}
        options={({ navigation }) => {
          return {
            headerRight: ({ tintColor }) => (
              <IconButton
                name="add"
                color={tintColor}
                size={24}
                style={{ marginHorizontal: 15 }}
                onPress={() => navigation.navigate("AddLocation")}
              />
            ),
            headerLeft: () => (
              <Text style={{ color: "#fc03a5", marginHorizontal: 15 }}>
                Skyline
              </Text>
            ),
            title: "Weather",
          };
        }}
      />
      <Stack.Screen
        name="AddLocation"
        component={AddLocation}
        options={{ title: "Add City" }}
      />
      <Stack.Screen name="ViewWeather" component={ViewWeather} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <WeatherContextProvider>
        <NewsContextProvider>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarBackground: () => <TabBarGradient />,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "#ccc",
                tabBarStyle: {
                  height: 60,
                  paddingVertical: 10,
                },
              }}
            >
              <Tab.Screen
                name="News"
                component={NewsStack}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons
                      name="newspaper-outline"
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Weather"
                component={WeatherStack}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="rainy-outline" size={size} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </NewsContextProvider>
      </WeatherContextProvider>
      <StatusBar style="light" />
    </>
  );
}
