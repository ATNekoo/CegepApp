import React, { useContext, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import playlistsData from "../data/songs.json";
import { sortByAlphabet } from "../hooks/Sort";
import { ThemeContext } from "../context/ThemeContext";


export default function Playlists() {
  const [sortedData, setSortedData] = useState(playlistsData);
  const { colors } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Playlists</Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.object, borderColor: colors.accent }]} onPress={() => setSortedData(sortByAlphabet(sortedData))} activeOpacity={0.7}>
        <Text style={[styles.buttonText, { color: colors.text }]}>Trier par ordre alphabétique</Text>
      </TouchableOpacity>

      <FlatList
        data={sortedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: colors.object, borderColor: colors.accent }]}>
            <Text style={[styles.songTitle, { color: colors.text }]}>{item.song_title}</Text>
            <Text style={[styles.artist, { color: colors.text }]}>{item.artist_name}</Text>
            <Text style={[styles.genre, { color: colors.accent }]}>{item.genre}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create(
    {
        container: { 
            flex: 1,
            padding: 16,
        },
        button: {
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 16,
            marginTop: 8,
            borderWidth: 2,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
        },
        buttonText: { 
            fontSize: 16, 
            fontWeight: 'bold', 
        }, 
        title: { 
            fontSize: 24, 
            fontWeight: 'bold',
            marginBottom: 12, 
        }, 
        itemContainer: { 
            backgroundColor: "#606470", 
            padding: 12, 
            marginBottom: 10, 
            borderRadius: 8, 
            shadowOpacity: 0.1, 
            shadowRadius: 4, 
            borderWidth: 2, 
            elevation: 2
        }, 
        songTitle: { 
            fontSize: 18, 
            fontWeight: '600', 
        }, 
        artist: { 
            fontSize: 14, 
        }, 
        genre: { 
            fontSize: 12, 
        }
    });
