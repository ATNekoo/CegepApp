import { useState, useMemo, useContext } from "react";
import { View, StyleSheet, FlatList } from 'react-native';
import data from "../data/songs.json";
import SearchBar from "../components/SearchBar";
import SelectionBar from "../components/SelectionBar";
import SongCard from "../components/SongCard";
import SongPlayerModal from "../hooks/MusicPlayer";
import { useStyleFactory } from "../context/ThemeContext";

const SEARCH_OPTIONS = {
    'genre': 'Genre',
    'song_title': 'Title',
    'artist_name': 'Artist name',
    'album_name': 'Album name'
}

const filterSong = (field, hint) => {
    return data.map(song=>({
            match: song[field]?.toLowerCase().indexOf(hint.trim().toLowerCase()),
            song
        }))
        .filter(({match})=>match >= 0)
        .sort((a,b)=>a.match-b.match)
        .map(({song})=>song);
}

const SearchScreen = ()=>{
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentOption, setCurrentOption] = useState('song_title');
    const [currentData, setCurrentData] = useState([]);
    const handleSearch = (hint)=>{
        setCurrentData(filterSong(currentOption, hint));
    }
    const styles = useStyleFactory(styleFactory);

    return (
        <View style={styles.page}>
            <SearchBar onSearch={handleSearch}/>
            <SelectionBar options={SEARCH_OPTIONS} selection={currentOption} onSelection={(key)=>setCurrentOption(key)} />
            <FlatList
                style={styles.content}
                data={currentData}
                renderItem={({item, index})=>(
                    <SongCard 
                        item={item} 
                        index={index}
                        onPress={(item)=>setSelectedItem(item)}/>
                )}
            />
            <SongPlayerModal
                visible={selectedItem !== null}
                onClose={() => setSelectedItem(null)}
                videoId={selectedItem?.youtube_id}
                title={selectedItem?.song_title}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#323643',
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
    },
    content: {
        marginTop: 12,
        padding: 20,
        paddingTop: 8,
    }
})

const styleFactory = (colors)=>(console.log(colors), {
    page: {
        backgroundColor: colors.background,
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
    },
    content: {
        marginTop: 12,
        padding: 20,
        paddingTop: 8,
    }
});

export default SearchScreen;