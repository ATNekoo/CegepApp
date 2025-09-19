import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import axios from "axios";

export default function ChatbotScreen() {
    const [userText, setChangeText] = useState("")
    const [botAnswer, setBotAnswer] = useState("Give me your favorite genres, artists and/or songs for recommendations.");
    const [userID, setUserID] = useState(0);

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
        const outputBot = response.data
        if (outputBot) {
            setBotAnswer(outputBot);
        } else {
            setBotAnswer("Pas de output reçu par le bot...AAAAAAHHHHHHH");
        }
        
        } catch (error) {
            console.error("Erreur avec le ChatBot (...jpp)", error);
            setBotAnswer("J'ai mal coder woops.")
        }
    } 

    return (
        <View style={styles.container}>
            <View style={styles.ChatBotBox}>
            <Text style={styles.title}>{botAnswer}</Text>
            </View>
            <View style={styles.userContainer}>
                <TextInput style={styles.textInput} onSubmitEditing={() => {sendMessageToChatbot(userText); setBotAnswer("Good taste ! Let me think for a second...")}} onChangeText={setChangeText} value={userText} placeholder='Write here.' placeholderTextColor={"#f7f7f7"}></TextInput>
                    <View style={styles.buttonAndText}>
                    <TouchableOpacity style={styles.button} onPress={() => {sendMessageToChatbot(userText); setBotAnswer("Good taste ! Let me think for a second...")}} >
                        <Text style={styles.subtitle}>Enter
                        </Text>
                    </TouchableOpacity>
                    </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width:"auto",
        backgroundColor:"#323643",
    },
    userContainer: {
        flex:1,
        flexDirection:"column",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:"5vh",
    },
    title: {
        fontSize: 17,
        fontWeight: 500,
        color:"#323643"
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 500,
        margin:10,
        color: "#323643",
    },
    textInput: {
        width:'35vh',
        borderWidth: 2,
        borderRadius: 4,
        padding:20,
        borderColor:"#93deff",
        color:"#f7f7f7",
    },
    button: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor:"#606470",
        backgroundColor:'#93deff',
        marginTop:"15vh",
        width:"auto",
    },
    buttonAndText: {
        width:"auto",
        alignItems: 'center',
        justifyContent: 'center',
    },
    ChatBotBox: {
        backgroundColor:"#93deff",
        borderRadius:5,
        padding:20,
        marginTop:42,
        flexDirection:"row",
        alignItems: 'center',
        justifyContent: 'center',
        width:"auto",
        height:"auto"
    }
})