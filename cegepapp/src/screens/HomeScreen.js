import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({navigation}) {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Sweet home Alabama...</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}><Text>See Details</Text></TouchableOpacity>
            <View></View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Counter')}><Text>See Counter</Text></TouchableOpacity>
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
});