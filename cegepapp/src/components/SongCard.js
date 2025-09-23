import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withDelay, Easing } from 'react-native-reanimated';
import { useStyleFactory } from '../context/ThemeContext';
const SongCard = ({ item, index, onPress, onLikePress }) => {
    const fadeIn = useSharedValue(0);
    const animStyle = useAnimatedStyle(()=>({
        opacity: fadeIn.value,
        transform: [{
            scale: fadeIn.value*.5+.5,
        }, {
            translateY: (1-fadeIn.value)*100
        }]
    }));
    useEffect(()=>{
        fadeIn.set(0);
        fadeIn.set( withDelay(index*50, withTiming(1, {duration:300, easing: Easing.bezier(0.44, 0.19, 0.09, 1.02)})));
    }, [index]);

    const styles = useStyleFactory(styleFactory);

    return (
        <Animated.View style={animStyle}>
            <TouchableOpacity 
                style={styles.card} 
                onPress={()=>typeof onPress === 'function' && onPress(item)}
                >
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                />
                <View style={{flex:1}}>
                    <Text style={styles.songLine}>{item.song_title} – {item.artist_name}</Text>
                    
                    <Text style={[styles.songLine,  {fontSize:12, color:"#ccc"}]}>{item.album_name}</Text>
                </View>
                <TouchableOpacity onPress={()=>typeof onLikePress === 'function' && onLikePress(item)}>
                    <Image 
                        tintColor={styles.likeIcon.tintColor}
                        style={styles.likeIcon}  
                        source={require('../icons/Like.png')}/>
                </TouchableOpacity>

            </TouchableOpacity>
        </Animated.View>
    );
}

const styleFactory = (colors)=>({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.object,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: colors.border
    },
    image: { 
        width: 60, 
        height: 60, 
        borderRadius: 5, 
        borderWidth: 1,
        marginRight: 10,
        borderColor: colors.border,
    },
    songLine: {
        flex: 1,
        fontSize: 15,
        fontWeight: "500",
        color: colors.text,
        flexWrap: "wrap",
    },
    likeIcon:{
        width:30,
        height:30,
        tintColor: colors.accent
    }
});

export default SongCard;