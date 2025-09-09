import React,{useContext} from "react";
import {View,Text,Switch,StyleSheet} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';

 export default function SettingsScreen() {
    
    const {theme,toggleTheme} = useContext(ThemeContext);

   return (

     <View style={[styles.container, theme === 'dark' ? styles.dark :
       styles.light]}>
       <Text style={styles.title}>Paramètres</Text>
       <View style={styles.row}>
         <Text>Mode sombre</Text>
         <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
       </View>
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

