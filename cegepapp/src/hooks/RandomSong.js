import songsData from "../data/songs.json";

const shuffleArray = (array) => {
    const shuffled = [...array]; // make a copy
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const getRandomSongs = (count = songsData.length) => {
    const shuffledSongs = shuffleArray(songsData);
    return shuffledSongs.slice(0, count);
};

export { getRandomSongs };