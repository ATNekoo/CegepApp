import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { getRandomSongs } from '../hooks/RandomSong';

export default function HomeScreen({navigation}) {

    const [featuredSongs, setFeaturedSongs] = useState([]);

    useEffect(() => {
        setFeaturedSongs(getRandomSongs(50));
    }, []);

    
    const renderSongItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: item.image }}
                style={styles.image}
            />
            <Text style={styles.songLine}>
                {item.song_title} ({item.album_name}) – {item.artist_name}
            </Text>
        </View>
    );

    return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Details")}>
        <Text style={styles.buttonText}>See Details</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Featured Songs</Text>

      <FlatList
        data={featuredSongs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item?.id?.toString()}
        showsVerticalScrollIndicator={false}
    />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const selected = getRandomSongs(3);
          setFeaturedSongs(selected);
        }}
      >
        <Text style={styles.buttonText}>Shuffle Songs</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#323643",
  },

  header: { 
    fontSize: 22, 
    fontWeight: "600", 
    marginBottom: 10,
    color: "#f7f7f7"
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#606470",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#93deff"
  },

  image: { 
    width: 60, 
    height: 60, 
    borderRadius: 5, 
    borderWidth: 1,
    marginRight: 10,
    borderColor: "#93deff",
  },

  songLine: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#f7f7f7",
    flexWrap: "wrap",
  },

  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#606470",
    borderWidth: 2,
    borderColor: "#93deff",
    marginVertical: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#f7f7f7",
    fontSize: 16,
    fontWeight: "500",
  },
});