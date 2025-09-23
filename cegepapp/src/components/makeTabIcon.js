import { Image } from "expo-image";

const makeTabIcon = (source) => ({size, color})=>{
    return (
        <Image
            tintColor={color}
            source={source}
            style={{
                width: size,
                height: size
            }}
        />
    );
}

export default makeTabIcon;