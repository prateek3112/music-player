import React, { useState, useRef } from "react";
import Player from "./Components/player";
import Song from "./Components/song";
import Library from "./Components/library";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/App.scss";
import data from "./utils";

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isLibrary,setLibrary] =useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    left: 0,
    duration: 0,
  });
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const left = e.target.duration - e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      ...songInfo,
      currentTime,
      left,
      duration,
    });
  };
  const libraryHandler =()=>{
    if(isLibrary){
      setLibrary(false);
    }
    else setLibrary(true);
  }

  const darkModeHandler = () => {
    if (isDark) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
  };
  return (
    <div
      className="App"
      style={isDark ? { backgroundColor: "Black", color: "#2be09e" } : {}}
    >
       <div className="text-right">
        <Button onClick={libraryHandler} variant="light">
          Library
        </Button>
        </div>
      <Song currentSong={currentSong} />
      <Player
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <div className="text-center">
        <Button onClick={darkModeHandler} className="btn btn-dark d">
          Dark mode
        </Button>
      </div>
      {isLibrary ? <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongs={setSongs}
      /> : null}
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
