import React, { useState, useRef } from "react";
import Player from "./Components/player";
import Song from "./Components/song";
import Library from "./Components/library";
import Nav from "./Components/nav";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/App.scss";
import data from "./data";

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isLibrary, setLibrary] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    left: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const left = e.target.duration - e.target.currentTime;
    const duration = e.target.duration;
    //calculating %
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animationP = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime,
      left,
      duration,
      animationPercentage: animationP,
    });
  };
  // const libraryHandler =()=>{
  //   if(isLibrary){
  //     setLibrary(false);
  //   }
  //   else setLibrary(true);
  // }
  const SongEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };
  const darkModeHandler = () => {
    if (isDark) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
  };
  return (
    <div
      className={`App ${isLibrary ? "library-active" : ""} ${
        isDark ? "darkMode" : ""
      }`}
    >
      <Nav
        setLibrary={setLibrary}
        isLibrary={isLibrary}
        darkModeHandler={darkModeHandler}
      />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      {songInfo.duration ? (
        <Player
          setSongInfo={setSongInfo}
          songInfo={songInfo}
          audioRef={audioRef}
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songs={songs}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
        />
      ) : (
        <Spinner className="spinner" animation="grow" />
      )}
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongs={setSongs}
        isLibrary={isLibrary}
        isDark={isDark}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={SongEndHandler}
      ></audio>
    </div>
  );
}

export default App;
