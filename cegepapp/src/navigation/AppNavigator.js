import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Playlists from "../screens/Playlists";
import DetailsScreen from "../screens/DetailsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ChatbotScreen from "../screens/ChatbotScreen";
import FavoriteSongsScreen from "../screens/FavoriteSongsScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerStyle: { backgroundColor: "#323643", height: 60, borderBottomWidth: 2, borderBottomColor: "#93deff" },
      headerTitleStyle: { fontSize: 16, fontWeight: "bold", color: "#f7f7f7" },
      headerTitleAlign: "center",
      tabBarActiveTintColor: "#93deff",
      tabBarInactiveTintColor: "#f7f7f7",
      tabBarStyle: {backgroundColor:"#323643", borderTopColor:"#93deff", borderTopWidth: 2}}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
      name="Playlist"
      component={Playlists}
      options={{ title: "Playlist" }}
      />
      <Tab.Screen
        name="Chatbot"
        component={ChatbotScreen}
        options={{ title: "Chatbot"}}
      />
           <Tab.Screen
        name="favoriteSongs"
        component={FavoriteSongsScreen}
        options={{
          title: "Favorites",
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
        }}
      />

      
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: "#323643", height: 60, borderBottomWidth: 2, borderBottomColor: "#93deff" },
          headerTitleStyle: { fontSize: 16, fontWeight: "bold", color: "#f7f7f7" },
          headerTintColor: "#93deff",
          headerTitleAlign: "center"}}>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
