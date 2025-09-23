import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { getRandomSongs } from '../hooks/RandomSong';
import SongPlayerModal from '../hooks/MusicPlayer';
import { useLiked } from '../context/FavoriteContext';
import { ThemeContext } from "../context/ThemeContext";

export default function HomeScreen({ navigation }) {
  const { colors } = useContext(ThemeContext);
  const { likedSongs, addSong } = useLiked();

  const [featuredSongs, setFeaturedSongs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    setFeaturedSongs(getRandomSongs());
  }, []);

  const handleOpenPlayer = (song) => {
    setCurrentSong(song);
    setModalVisible(true);
  };

  const toggleLike = (song) => {
    const isLiked = likedSongs.some(s => s.id === song.id);
    if (!isLiked) addSong(song);
  };

  const renderSongItem = ({ item }) => {
    const liked = likedSongs.some(s => s.id === item.id);

    return (
      <View style={[styles.card, { backgroundColor: colors.object, borderColor: colors.accent }]}>
        <TouchableOpacity onPress={() => handleOpenPlayer(item)}
          style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
          activeOpacity={0.7}>
          <Image
            source={{ uri: item.image }}
            style={[styles.image, { borderColor: colors.accent }]}/>
          <View style={{ flex: 1 }}>
            <Text style={[styles.songLine, { color: colors.text }]}>
              {item.song_title} – {item.artist_name}
            </Text>
            <Text style={[styles.songLine, { fontSize: 12, color: colors.text }]}>
              {item.album_name}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleLike(item)} style={{ marginLeft: 10 }}>
          <Image
            style={[styles.likeIcon, { tintColor: liked ? colors.accent : colors.text }]}
            source={require('../icons/Like.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <Text style={[styles.header, { color: colors.text }]}>Featured Songs</Text>

      <FlatList
        data={featuredSongs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item?.id?.toString()}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.object, borderColor: colors.accent }]}
        onPress={() => setFeaturedSongs(getRandomSongs())}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>Shuffle Songs</Text>
      </TouchableOpacity>

      <SongPlayerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        videoId={currentSong?.youtube_id}
        title={currentSong?.song_title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  header: { 
    fontSize: 22, 
    fontWeight: "600", 
    marginBottom: 10 
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
  },
  image: { 
    width: 60, 
    height: 60, 
    borderRadius: 5, 
    borderWidth: 1, 
    marginRight: 10 
  },
  songLine: { 
    flex: 1, 
    fontSize: 15, 
    fontWeight: "500", 
    flexWrap: "wrap" 
  },
  button: { 
    padding: 15, 
    borderRadius: 10, 
    borderWidth: 2, 
    marginVertical: 10, 
    alignItems: "center" 
  },
  buttonText: { 
    fontSize: 16, 
    fontWeight: "500" 
  },
  likeIcon: { 
    width: 30, 
    height: 30 
  },
});
