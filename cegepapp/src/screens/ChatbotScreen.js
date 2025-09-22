import React, { use, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image} from 'react-native';
import axios from "axios";
import SongPlayerModal from '../hooks/MusicPlayer';

export default function ChatbotScreen() {
    const [userText, setChangeText] = useState("")
    const [botAnswer, setBotAnswer] = useState("Give me your favorite genres, artists and/or songs for recommendations.");
    const [userID, setUserID] = useState(0);
    const [recommandedSongs, setRecommandedSongs] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentSong, setCurrentSong] = useState(null)

    const handleOpenPlayer = (song) => {
      setCurrentSong(song);
      setModalVisible(true)
    }

//J'ai utilise la documentation axios (https://axios-http.com/docs/post_example & https://axios-http.com/docs/res_schema)
// //Merci Alex de me laisser reprendre la base de ton code pour le render et le MusicPlayer bg.
//L'api YTB que l'agent AI utilise est limité à 10k recherche par jour, 1 Query du bot en prend 1000 quasiement. Si quota dépassé, vidéo afficher sur l'app sont pas bonne, 
//mais les musiques existes quand même réellement.
//Je peux vous montrez mon agent N8N c'est fun et simple à setup.
    const sendMessageToChatbot = async (userMessage) => {
        try {
            const response = await axios.post("https://williamgirouard.app.n8n.cloud/webhook/chatbot-message", {
                userID: userID,
                message: userMessage,
                sender: "user",
            },
        {
            headers: {
                "Content-Type": "application/json",
            },
        });
        setUserID(userID + 1);

        let rawOutputBot = response.data[0].output
        rawOutputBot = rawOutputBot.replace("```json\n","").replace("```","").trim()
        let parsedOutputBot = JSON.parse(rawOutputBot);
        setRecommandedSongs(parsedOutputBot.musics)
        console.log(parsedOutputBot.musics)
        setBotAnswer(parsedOutputBot.message);
        } catch (error) {
            console.error("Erreur avec le ChatBot (...jpp)", error);
            setBotAnswer("J'ai mal coder woops.")
        }
    } 

     const renderSongFromBot = ({ item }) => (
             <TouchableOpacity style={styles.card} onPress={() => handleOpenPlayer(item)}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                />
                <Text style={styles.songList}>
                    {item.title}  – {item.artist}
                </Text>
            </TouchableOpacity>
        );
    return (
        <View style={styles.container}>
            <View style={styles.ChatBotBox}>
            <Text style={styles.title}>{botAnswer}</Text>
            <FlatList 
                data={recommandedSongs} 
                renderItem={renderSongFromBot} 
                keyExtractor={(item) => item.ID.toString()} 
                showsVerticalScrollIndicator={false}>
            </FlatList>

            </View>
            <View style={styles.userContainer}>
                <TextInput style={styles.textInput} 
                onSubmitEditing={() => {sendMessageToChatbot(userText); setBotAnswer("Good taste ! Let me think for a second...")}} 
                onChangeText={setChangeText} value={userText} 
                placeholder='Press Enter to submit.' placeholderTextColor={"#f7f7f7"}>
                </TextInput>
                <View style={styles.buttonAndText}>
                    <TouchableOpacity
                    onPress={() => {sendMessageToChatbot(userText); setBotAnswer("Good taste ! Let me think for a second...")}} 
                    >
                        <Text style={styles.textInButton}>Enter</Text>
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
        backgroundColor:"#323643",
    },
    ChatBotBox: {
        flex:1,
        borderRadius:5,
        marginTop:30,
        flexDirection:"column",
        width:"auto",
        alignItems: 'center',
        justifyContent: 'center',
    },      
    card: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#606470",
        padding: 5,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "#93deff"
    },
    userContainer: {
        flex:1,
        flexDirection:"column",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:"2vh",
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
        color:"#f7f7f7",
        backgroundColor: "#606470",
        marginBottom:20,
        borderRadius: 10,
        padding: 10,
        marginBottom: 40,
        borderWidth: 2,
        borderColor: "#93deff"
    },
    textInput: {
        width:'35vh',
        borderWidth: 2,
        borderRadius: 4,
        padding:15,
        borderColor:"#93deff",
        color:"#f7f7f7",
    },
    songList: {
        flex: 1,
        fontSize: 15,
        fontWeight: 500,
        color:"#f7f7f7",
    },
    buttonAndText: {
        marginTop:20,
        borderWidth: 2,
        borderRadius: 4,
        borderColor:"#93deff",
        padding:10
    },
    textInButton: {
        color:"#f7f7f7",
        fontSize: 16,
        fontWeight: "500",
    },
      image: { 
        width: 60, 
        height: 60, 
        borderRadius: 5, 
        borderWidth: 1,
        marginRight: 10,
        borderColor: "#93deff",
  },
})