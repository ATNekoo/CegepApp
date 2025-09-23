import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function SettingsScreen({ navigation }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { 
        backgroundColor: isDark ? "#323643" : "#faf6e9", 
        height: 60, 
        borderBottomWidth: 2, 
        borderBottomColor: isDark ? "#93deff" : "#494949" 
      },
      headerTitleStyle: { 
        fontSize: 16, 
        fontWeight: "bold", 
        color: isDark ? "#f7f7f7" : "#494949" 
      },
      headerTitleAlign: "center",
    });
  }, [navigation, isDark]);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#323643" : "#faf6e9" }]}>
      <Text style={[styles.title, { color: isDark ? "#f7f7f7" : "#494949" }]}>Paramètres</Text>

      <View style={styles.row}>
        <Text style={{ color: isDark ? "#f7f7f7" : "#494949" }}>Mode sombre</Text>
        <Pressable
          onPress={toggleTheme}
          style={[styles.switch, { backgroundColor: isDark ? "#606470" : "#ece8d9" }]}
        >
          <Animated.View
            style={[
              styles.thumb,
              {
                transform: [{ translateX: isDark ? 20 : 0 }],
                backgroundColor: isDark ? "#93deff" : "#494949",
              },
            ]}
          />
        </Pressable>
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
    fontWeight: "600", 
    marginBottom: 12 
  },
  row: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between" 
  },
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    padding: 2,
  },
  thumb: { 
    width: 26, 
    height: 26, 
    borderRadius: 13 
  },
});
