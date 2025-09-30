import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLiked } from "../context/FavoriteContext"; // ⚠️ même chemin partout
import { ThemeContext } from "../context/ThemeContext";

export default function FavoriteSongsScreen() {
    const { likedSongs } = useLiked();
    const { colors } = useContext(ThemeContext)

    const renderItem = ({ item }) => (
        <View style={[styles.card, { backgroundColor: colors.background, borderColor: colors.border }]}>
            {!!item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <View style={{ flex: 1 }}>
                <Text style={[styles.title, { color: colors.text }]}>{item.song_title}</Text>
                <Text style={[styles.artist, { color: colors.text }]}>{item.artist_name}</Text>
                <Text style={[styles.album, { color: colors.textDim }]}>{item.album_name}</Text>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background, }]}>
            <Text style={[styles.header, { color: colors.text }]}>My  favorite Songs :   {likedSongs.length}</Text>

            <FlatList
                data={likedSongs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                extraData={likedSongs}
                ListEmptyComponent={
                    <Text style={{ color: "#ccc", textAlign: "center", marginTop: 20 }}>
                        Aucun favori encore.
                    </Text>
                }

            />




        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 15 },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#606470",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "#93deff",
    },
    image: { width: 60, height: 60, borderRadius: 6, marginRight: 10 },
    title: { fontSize: 16, fontWeight: "600" },
    artist: { fontSize: 14 },
    album: { fontSize: 12 },
});
