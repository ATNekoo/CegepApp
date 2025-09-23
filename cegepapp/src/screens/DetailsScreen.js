import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function DetailsScreen() {
  const { colors } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>CegepApp (may be changed)</Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        Application mobile multi-pages offrant un large catalogue musical. Écoutez vos morceaux grâce au lecteur intégré, créez vos playlists, sauvegardez vos favoris avec le système de likes et explorez facilement la bibliothèque grâce à la barre de recherche. Un chatbot intelligent recommande des musiques adaptées à vos goûts, selon vos artistes, morceaux ou genres préférés. Le tout dans une interface moderne, élégante et intuitive.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 28,
  },
});
