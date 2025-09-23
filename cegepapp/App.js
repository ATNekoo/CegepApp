import 'react-native-gesture-handler'; 
import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { SavedTracks } from './src/context/FavoriteContext';
import AppNavigator from './src/navigation/AppNavigator';


export default function App() {
  return (
    <ThemeProvider>
      <SavedTracks>
      <AppNavigator/>
      </SavedTracks>
    </ThemeProvider>
   
  );
}


