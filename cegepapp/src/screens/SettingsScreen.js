import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Animated, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function SettingsScreen({ navigation }) {
    const { theme, colors, toggleTheme } = useContext(ThemeContext);
    const isDark = theme === "dark";


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: colors.background,
                height: 60,
                borderBottomWidth: 2,
                borderBottomColor: colors.border,
            },
            headerTitleStyle: {
                fontSize: 16,
                fontWeight: "bold",
                color: colors.text,
            },
            headerTitleAlign: "center",
        });
    }, [navigation, colors]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text }]}>Paramètres</Text>

                <View style={styles.row}>
                    <Text style={{ color: colors.text }}>Mode sombre</Text>
                    <Pressable
                        onPress={toggleTheme}
                        style={[styles.switch, { backgroundColor: colors.object }]}
                    >
                        <Animated.View
                            style={[
                                styles.thumb,
                                {
                                    transform: [{ translateX: isDark ? 20 : 0 }],
                                    backgroundColor: colors.accent,
                                },
                            ]}
                        />
                    </Pressable>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.object, borderColor: colors.border }]}
                onPress={() => navigation.navigate("Details")}
            >
                <Text style={[styles.buttonText, { color: colors.text }]}>See Details</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    content: {
        flex: 1
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 12
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    switch: {
        width: 50,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        padding: 2,
    },
    thumb: {
        width: 26,
        height: 26,
        borderRadius: 13
    },
    button: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 2,
        marginVertical: 10,
        alignItems: "center"
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500"
    },
});