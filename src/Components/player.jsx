import React ,{useEffect} from "react";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ audioRef ,songInfo, setSongInfo ,currentSong, isPlaying, setIsPlaying , songs , setCurrentSong , setSongs}) => {
  
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong])
  const playSongHandler = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      setIsPlaying(false);
      audioRef.current.pause();
    }
    
  };

  
  
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    //Forward BAck
    if (direction === "skip-forward") {
     await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
     if (isPlaying) audioRef.current.play();
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
      await  setCurrentSong(songs[songs.length - 1]);
      if (isPlaying) audioRef.current.play();
        return;
      }
     await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  //Adding the styles
  
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>+{getTime(songInfo.currentTime)}</p>
        <div style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }} className="track">
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>-{getTime(songInfo.left)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={()=>{skipTrackHandler('skip-back')}} className="skip-back" icon={faAngleLeft} size="2x" />

        <FontAwesomeIcon
          className="play"
          onClick={playSongHandler}
          icon={isPlaying ? faPause : faPlay}
          size="2x"
        />

        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
          onClick={()=>{skipTrackHandler('skip-forward')}}
        />
      </div>
      
    </div>
  );
};

export default Player;
