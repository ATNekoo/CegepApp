import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLiked } from "../context/FavoriteContext"; // ⚠️ même chemin partout

export default function FavoriteSongsScreen() {
  const { likedSongs } = useLiked();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {!!item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.song_title}</Text>
         <Text style={styles.artist}>{item.artist_name}</Text>
       <Text style={styles.album}>{item.album_name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My  favorite Songs :   {likedSongs.length}</Text>

      <FlatList
        data={likedSongs}
        keyExtractor={(item )=> item.id.toString()}
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
  container: { flex: 1, backgroundColor: "#323643", padding: 20 },
  header: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#606470",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#93deff",
  },
  image: { width: 60, height: 60, borderRadius: 6, marginRight: 10 },
  title: { color: "#fff", fontSize: 16, fontWeight: "600" },
  artist: { color: "#ccc", fontSize: 14 },
  album: { color: "#aaa", fontSize: 12 },
});
