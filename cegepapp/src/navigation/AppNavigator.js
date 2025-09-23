import React, { useContext } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "../context/ThemeContext";

import HomeScreen from "../screens/HomeScreen";
import Playlists from "../screens/Playlists";
import DetailsScreen from "../screens/DetailsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ChatbotScreen from "../screens/ChatbotScreen";
import FavoriteSongsScreen from "../screens/FavoriteSongsScreen";
import SearchScreen from "../screens/SearchScreen";
import makeTabIcon from "../components/makeTabIcon";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  const { colors } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background, height: 60, borderBottomWidth: 2, borderBottomColor: colors.accent },
        headerTitleStyle: { fontSize: 16, fontWeight: "bold", color: colors.text },
        headerTitleAlign: "center",
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.accent, borderTopWidth: 2},
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Playlist" component={Playlists} />
      <Tab.Screen name="Chatbot" component={ChatbotScreen} />
      <Tab.Screen name="Favorites" component={FavoriteSongsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme === "light" ? DefaultTheme : DarkTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { height: 60 },
          headerTitleStyle: { fontSize: 16, fontWeight: "bold" },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
