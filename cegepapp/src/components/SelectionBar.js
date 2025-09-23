import { StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useStyleFactory } from '../context/ThemeContext';
const SelectionBar = ({style, options, selection, onSelection})=>{
    const makeSelectionHandler = (key)=> () =>{
        if(typeof onSelection === 'function') 
            onSelection(key)
    }

    const styles = useStyleFactory(styleFactory);


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

const styleFactory =(colors)=>({
    container: {
        overflow: 'scroll',
        flexDirection: 'row',
        width: '100%',
        flexShrink: 0,
        flexGrow: 0,
        paddingHorizontal: 6,
    },
    option: {
        backgroundColor: colors.background,
        color: colors.accent,
        borderColor: colors.accent,
        borderWidth: 1,
        padding: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginHorizontal: 6,
    },
    option_current: {
        borderColor: colors.accent,
        backgroundColor: colors.accent,
        color: colors.text
    },
})

export default SelectionBar;