import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

export default function DetailsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bonjour les jeunes...</Text>
            <Text style={styles.subtitle}> Bonjour princesse, ça va ? t'a bien dormis ? T'as pas pensé à moi ? Même pas un peu ?
            </Text>
        </View>
    );
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
})