import React, { createContext, useState, useContext } from "react";

const FavoriteContext = createContext();

export function SavedTracks({ children }) {
  const [likedSongs, setLikedSongs] = useState([]);

  const addSong = (song) =>
    setLikedSongs((prev) => {
      if (!song || !song.id) return prev;
      const exists = prev.some((s) => s.id === song.id);
      if (exists) return prev; 
      return [song, ...prev];
    });

  return (
    <FavoriteContext.Provider value={{ likedSongs, addSong }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useLiked() {
  return useContext(FavoriteContext);
}
