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
        borderRadius: 20,
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
      }}
    >
      <Stack.Screen
        name="NewsHome"
        component={NewsHome}
        options={{ title: "News" }}
      />
      <Stack.Screen
        name="ViewNews"
        component={ViewNews}
        options={{ title: "News" }}
      />
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
      }}
    >
      <Stack.Screen
        name="WeatherHome"
        component={WeatherHome}
        options={({ navigation, route }) => {
          return {
            headerRight: ({ tintColor }) => (
              <IconButton
                name="add"
                color={tintColor}
                size={24}
                style={{ marginHorizontal: 15 }}
              />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <NewsContextProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarBackground: () => <TabBarGradient />,
              tabBarActiveTintColor: "white",
              tabBarInactiveTintColor: "#ccc",
              tabBarStyle: {
                margin: 10,
                height: 60,
                paddingVertical: 10,
                position: "absolute",
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
      <StatusBar style="light" />
    </>
  );
}
