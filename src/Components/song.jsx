import React from "react";

const Song = ({ currentSong , isPlaying}) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover} className={`${isPlaying ? "rotateSong" : ""}`} alt="" sizes="16 x 16" />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
