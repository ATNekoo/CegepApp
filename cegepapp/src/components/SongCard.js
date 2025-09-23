import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withDelay, Easing } from 'react-native-reanimated';
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
                    <Image style={styles.likeIcon}  source={require('../icons/Like.png')}/>
                </TouchableOpacity>

            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#606470",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "#93deff"
    },
    image: { 
        width: 60, 
        height: 60, 
        borderRadius: 5, 
        borderWidth: 1,
        marginRight: 10,
        borderColor: "#93deff",
    },
    songLine: {
        flex: 1,
        fontSize: 15,
        fontWeight: "500",
        color: "#f7f7f7",
        flexWrap: "wrap",
    },
    likeIcon:{
        width:30,
        height:30
    }
});

export default SongCard;