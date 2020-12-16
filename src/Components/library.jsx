import React from "react";
import Librarysong from "./librarySong";


const Library = ({ songs, setCurrentSong ,audioRef , isPlaying, setIsPlaying , setSongs , isLibrary ,isDark}) => {
  return (
    <div className={`library ${isLibrary ? "active-library" : ""} ${isDark ? "active-darkMode" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => {
          return (
            <Librarysong
              Song={song}
              setCurrentSong={setCurrentSong}
              songs={songs}
              key={song.id}
              audioRef={audioRef}
              isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongs={setSongs}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
