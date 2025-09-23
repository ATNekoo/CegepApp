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
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: makeTabIcon(require("../icons/music-icon.svg"))}}/>
      <Tab.Screen name="Search" component={SearchScreen} options={{tabBarIcon: makeTabIcon(require("../icons/search-icon.svg"))}}/>
      <Tab.Screen name="Playlist" component={Playlists} options={{tabBarIcon: makeTabIcon(require("../icons/playlist-icon.svg"))}}/>
      <Tab.Screen name="Chatbot" component={ChatbotScreen} options={{tabBarIcon: makeTabIcon(require("../icons/chat-icon.svg"))}}/>
      <Tab.Screen name="Favorites" component={FavoriteSongsScreen} options={{tabBarIcon: makeTabIcon(require("../icons/star-icon.svg"))}}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarIcon: makeTabIcon(require("../icons/search-icon.svg"))}}/>
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { theme, colors } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme === "light" ? DefaultTheme : DarkTheme}>
      <Stack.Navigator
        screenOptions={{
        headerStyle: { backgroundColor: colors.background, height: 60, borderBottomWidth: 2, borderBottomColor: colors.accent },
        headerTitleStyle: { fontSize: 16, fontWeight: "bold", color: colors.text },
        headerTitleAlign: "center",
      }}>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
