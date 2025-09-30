import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import axios from "axios";
import SongPlayerModal from '../hooks/MusicPlayer';
import { ThemeContext } from "../context/ThemeContext";

export default function ChatbotScreen() {
  const { colors } = useContext(ThemeContext);

  const [userText, setChangeText] = useState("");
  const [botAnswer, setBotAnswer] = useState("Give me your favorite genres, artists and/or songs for recommendations.");
  const [userID, setUserID] = useState(0);
  const [recommandedSongs, setRecommandedSongs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const handleOpenPlayer = (song) => {
    setCurrentSong(song);
    setModalVisible(true);
  };

  const sendMessageToChatbot = async (userMessage) => {
    try {
      const response = await axios.post("https://williamgirouard.app.n8n.cloud/webhook/chatbot-message", {
        userID: userID,
        message: userMessage,
        sender: "user",
      }, {
        headers: { "Content-Type": "application/json" },
      });

      setUserID(userID + 1);

      let rawOutputBot = response.data[0].output;
      rawOutputBot = rawOutputBot.replace("```json\n", "").replace("```", "").trim();
      let parsedOutputBot = JSON.parse(rawOutputBot);

      setRecommandedSongs(parsedOutputBot.musics);
      setBotAnswer(parsedOutputBot.message);
    } catch (error) {
      console.error("Erreur avec le ChatBot (...jpp)", error);
      setBotAnswer("J'ai mal coder woops.");
    }
  };

  const renderSongFromBot = ({ item }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.object, borderColor: colors.border }]} onPress={() => handleOpenPlayer(item)}>
      <Image
        source={{ uri: item.image }}
        style={[styles.image, { borderColor: colors.border }]}
      />
      <Text style={[styles.songList, { color: colors.text }]}>
        {item.title} – {item.artist}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.ChatBotBox}>
        <Text style={[styles.title, { color: colors.text, backgroundColor: colors.object, borderColor: colors.border }]}>
          {botAnswer}
        </Text>

        <FlatList
          data={recommandedSongs}
          renderItem={renderSongFromBot}
          keyExtractor={(item) => item.ID.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.userContainer}>
        <TextInput
          style={[styles.textInput, { borderColor: colors.border, color: colors.text }]}
          onSubmitEditing={() => { sendMessageToChatbot(userText); setBotAnswer("Good taste ! Let me think for a second..."); }}
          onChangeText={setChangeText}
          value={userText}
          placeholder='Press Enter to submit.'
          placeholderTextColor={colors.textDim}
        />

        <View style={[styles.buttonAndText, { borderColor: colors.border }]}>
          <TouchableOpacity
            onPress={() => { sendMessageToChatbot(userText); setBotAnswer("Good taste ! Let me think for a second..."); }}
          >
            <Text style={[styles.textInButton, { color: colors.text }]}>Enter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SongPlayerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        videoId={currentSong ? currentSong.videoId : null}
        title={currentSong ? currentSong.title : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    width:"auto",
  },
  ChatBotBox: {
    flex:1,
    borderRadius:5,
    marginTop:30,
    flexDirection:"column",
    width:"auto",
  },      
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
    borderWidth: 2,
  },
  userContainer: {
    flex:1,
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:50,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 40,
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
  },
  textInput: {
    width:'170',
    borderWidth: 2,
    borderRadius: 4,
    padding:15,
  },
  songList: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  buttonAndText: {
    marginTop:20,
    borderWidth: 2,
    borderRadius: 4,
    padding:10
  },
  textInButton: {
    fontSize: 16,
    fontWeight: "500",
  },
  image: { 
    width: 60, 
    height: 60, 
    borderRadius: 5, 
    borderWidth: 1,
    marginRight: 10,
  },
});