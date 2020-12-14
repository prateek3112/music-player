import React from "react";

const LibrarySong = ({
  Song,
  setCurrentSong,
  songs,
  audioRef,
  isPlaying,
  setIsPlaying,
  setSongs,
}) => {
  const playHandler = async () => {
    const newSongs = songs.map((song) => {
      if (song.id === Song.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
    if (isPlaying) {
      await setCurrentSong(Song);
      audioRef.current.play();
    } else {
      setCurrentSong(Song);

      audioRef.current.play();
    }
  };

  return (
    <div
      onClick={playHandler}
      className={`library-song ${Song.active ? "selected" : ""}`}
    >
      <img src={Song.cover} alt="" />
      <div className="song-description">
        <h3>{Song.name}</h3>
        <h4>{Song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
