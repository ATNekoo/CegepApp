import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRef, useState } from "react";
import { useStyleFactory } from '../context/ThemeContext';

const SearchBar = ({ onSearch }) => {
    const textInputRef = useRef(null);
    const [isFocus, setFocus] = useState(false);
    const [currentValue, setCurrentValue] = useState('');

    const handleSearch = (value) => {
        if (typeof onSearch === 'function')
            onSearch(value);
    }

    const styles = useStyleFactory(styleFactory);

    return (
        <View
            style={styles.container}>
            <TextInput
                ref={textInputRef}
                style={[styles.input, isFocus && styles.input_focus]}
                onChangeText={e => (setCurrentValue(e), handleSearch(e))}
                value={currentValue}
                onFocus={() => setFocus(true)}
                onBlur={() => (setFocus(false), handleSearch(currentValue))}
                placeholder='Search...'
                placeholderTextColor={styles.placeholder.color}
            />
            <TouchableOpacity onPress={() => (textInputRef.current?.blur(), handleSearch(currentValue))}>
                <Image
                    tintColor={styles.button.tintColor}
                    style={styles.button}
                    source={require("../icons/search-icon.svg")} />
            </TouchableOpacity>
        </View>
    );
};

const styleFactory = (colors) => ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        columnGap: 8,
    },
    input: {
        fontSize: 16,
        flexGrow: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 2,
        backgroundColor: colors.object,
        borderColor: colors.border,
        color: colors.text
    },
    input_focus: {
        backgroundColor: colors.object,
        outlineWidth: 0
    },
    button: {
        width: 32,
        height: 32,
        tintColor: colors.accent
    },
    placeholder: {
        color: colors.textDim
    }
});

export default SearchBar;