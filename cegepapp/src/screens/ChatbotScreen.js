import React, { use, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native';
import axios from "axios";

export default function ChatbotScreen() {
    const [userText, setChangeText] = useState("")
    const [botAnswer, setBotAnswer] = useState("Give me your favorite genres, artists and/or songs for recommendations.");
    const [userID, setUserID] = useState(0);
    const [recommandedSongs, setRecommandedSongs] = useState([]);
//J'ai utilise la documentation axios (https://axios-http.com/docs/post_example & https://axios-http.com/docs/res_schema)
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
        console.log(rawOutputBot);
        let parsedOutputBot = JSON.parse(rawOutputBot);
        setRecommandedSongs(parsedOutputBot.musics)

   
        if (parsedOutputBot.message) {
            setBotAnswer(parsedOutputBot.message);
        } else {
            setBotAnswer("Pas de output reçu par le bot...AAAAAAHHHHHHH");
        }
        
        } catch (error) {
            console.error("Erreur avec le ChatBot (...jpp)", error);
            setBotAnswer("J'ai mal coder woops.")
        }
    } 
    //Merci Alex de me laisser reprendre la base de ton code bg.
     const renderSongFromBot = ({ item }) => (
            <View style={styles.card}>
                <Text style={styles.songList}>
                    {item.title}  – {item.artist}
                </Text>
            </View>
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
})