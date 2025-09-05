import React from 'react'; 
import { View, Text, Button, StyleSheet } from 'react-native'; 
import { useCounter } from '../hooks/useCounter'; 

export default function CounterScreen() { 
    const { count, increment, decrement, reset } = useCounter(0);

    return ( 
        <View style={styles.container}>
            <Text style={styles.value}>Compteur : {count}</Text>
            <View style={styles.row}>
                <Button title="+1" onPress={increment} />
                <View style={{ width: 12 }} />
                <Button title="-1" onPress={decrement} />
                <View style={{ width: 12 }} /> 
                <Button title="Reset" onPress={reset} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' }, 
    value: { fontSize: 22, marginBottom: 16 },
    row: { flexDirection: 'row', alignItems: 'center' },
});