import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';

const SelectionBar = ({style, options, selection, onSelection})=>{
    const makeSelectionHandler = (key)=> () =>{
        if(typeof onSelection === 'function') 
            onSelection(key)
    }
    return (
        <ScrollView 
            style={StyleSheet.compose(styles.container, style)}
            horizontal={true}>
            {Object.entries(options).map(([key, label])=>{
                return (
                    <TouchableOpacity 
                        style={{}} 
                        onPress={makeSelectionHandler(key)}
                        key={key}>
                        <Text style={[styles.option, key==selection && styles.option_current]}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        overflow: 'scroll',
        flexDirection: 'row',
        width: '100%',
        flexShrink: 0,
        flexGrow: 0,
        paddingHorizontal: 6,
    },
    option: {
        backgroundColor: '#323643',
        color: '#93deff',
        borderColor: '#4087b7ff',
        borderWidth: 1,
        padding: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginHorizontal: 6,
    },
    option_current: {
        borderColor: '#93deff',
        backgroundColor: '#93deff',
        color: '#323643'
    },
})

export default SelectionBar;