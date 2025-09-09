import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({navigation}) {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>
            <Button title='See details' onPress={() => navigation.navigate('Details')}></Button>
            <View></View>
            <Button title='See counter' onPress={() => navigation.navigate('Counter')}></Button>
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
    }
});