import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getRandomSongs } from '../hooks/RandomSong';

export default function HomeScreen({navigation}) {

    const [featuredSongs, setFeaturedSongs] = useState([]);

    useEffect(() => {
        const selected = getRandomSongs();
        setFeaturedSongs(selected);
    }, []);

    const renderSongItem = ({item}) => {
        <View>
            <Image/>
            <View/>
        </View>
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Search</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}><Text>See Details</Text></TouchableOpacity>
            <View></View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        padding : 20
    },
    title: {
        fontSize: 25,
        fontWeight: 500,
        margin: 20,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 400,
        margin: 20,
    },
    button: {
        padding: 20,
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: 'rebeccapurple',
    },
    listContainer: {
        justifyContent: 'space-between'
    },
    songCard : {
        flexDirection: 'row',
        alignItems: "center",
        padding: 12,
        marginRight: 16,
        marginBottom: 20,
        
    }
});