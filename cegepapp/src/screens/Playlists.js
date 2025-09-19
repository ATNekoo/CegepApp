import React from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import playlistsData from "../data/songs.json";

export default function Playlists(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Playlists</Text>
            <FlatList
                data={playlistsData}
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#056bf0ff',
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    songTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#222',
    },
    artist: {
        fontSize: 14,
        color: '#555',
    },
    genre: {
        fontSize: 12,
        color: '#999',
    },
});
