
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import playlistsData from "../data/songs.json";

export default function Playlists() {
    const [sortedData, setSortedData] = useState(playlistsData);

    const sortByAlphabet = () => {
        const sorted = [...sortedData].sort((a, b) =>
            a.song_title.localeCompare(b.song_title)
        );
        setSortedData(sorted);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Playlists</Text>

           
            <TouchableOpacity style={styles.button} onPress={sortByAlphabet}>
                <Text style={styles.buttonText}>Trier par ordre alphabétique</Text>
            </TouchableOpacity>

            <FlatList
                data={sortedData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.songTitle}>{item.song_title}</Text>
                        <Text style={styles.artist}>{item.artist_name}</Text>
                        <Text style={styles.genre}>{item.genre}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#01040eff',
          borderColor: "#93deff"
    },
    button: {
    backgroundColor: '#93deff', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#ffffff', 
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5, 
},

buttonText: {
    color: '#000000', 
    fontSize: 16,
    fontWeight: 'bold',
},

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#056bf0ff',
    },
    itemContainer: {
        backgroundColor:  "#606470",
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: "#242020ff",
        borderColor: "#93deff",
        shadowOpacity: 0.1,
        shadowRadius: 4,
         borderWidth: 2,
        elevation: 2,
    },
    songTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffffff',
    },
    artist: {
        fontSize: 14,
        color: '#ffffffff',
    },
    genre: {
        fontSize: 12,
        color: '#999',
    },
});
