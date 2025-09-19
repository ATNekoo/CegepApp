const songsData = require("../data/songs.json")

const shuffleArray = () => {
    const shuffled = songsData;
    
    for (let i = shuffled.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled
}

const getRandomSongs = (count = 3) =>  {
    const shuffledSongs = shuffleArray(songsData);
    return shuffledSongs.slice(0, count);
}

console.log(getRandomSongs())