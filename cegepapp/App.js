import 'react-native-gesture-handler'; 
import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';

import AppNavigator from './src/navigation/AppNavigator';


export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator/>
    </ThemeProvider>
   
  );
}


