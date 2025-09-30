export const sortByAlphabet = (data) => {
    return [...data].sort((a, b) =>
        a.song_title.localeCompare(b.song_title)
    );
};