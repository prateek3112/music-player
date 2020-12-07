import React, { useRef ,useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const playSongHandler = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      setIsPlaying(false);
      audioRef.current.pause();
    }
  };

  const [songInfo,setSongInfo] = useState({
    currentTime : null,
    left : null
  })
  const timeUpdateHandler =(e)=>{
  const  currentTime = e.target.currentTime
   const  left = e.target.duration - e.target.currentTime
    setSongInfo(
      {
        ...songInfo,currentTime,left
      }
     
    )
    
    }
    const getTime=(time)=>{
      return (
        Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      )
    }
  return (
    <div className="player">
      <div className="time-control">
  <p>+{getTime(songInfo.currentTime)}</p>
        <input type="range" />
  <p>-{getTime(songInfo.left)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" icon={faAngleLeft} size="2x" />

        <FontAwesomeIcon
          className="play"
          onClick={playSongHandler}
          icon={isPlaying ? faPause : faPlay }
          size="2x"
        />

        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
      <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
};

export default Player;
