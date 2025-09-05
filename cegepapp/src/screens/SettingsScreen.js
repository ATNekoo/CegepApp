import React,{useContext} from "react";
import {View,Text,Switch,Stylesheet} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';

 export default function SettingsScreen() {
    
    const {theme,toggleTheme} = useContext(ThemeContext);

   return (

    <View>



    </View>



   );
}


   const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  light: {
    backgroundColor: '#ffffff'
  },
  dark: {
    backgroundColor: '#111111'
  },
});

