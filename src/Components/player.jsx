import React, { useRef } from "react";

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
      if(!isPlaying){
    setIsPlaying(true);
    audioRef.current.play();
      }
      else{
    
      setIsPlaying(false);
      audioRef.current.pause();
    }
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>Start Time</p>
        <input type="range" />
        <p>end Time</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" icon={faAngleLeft} size="2x" />
        
        {isPlaying ? (
          <FontAwesomeIcon
            className="play"
            onClick={playSongHandler}
            icon={faPause}
            size="2x"
          />
        ) : (
          <FontAwesomeIcon
            className="play"
            onClick={playSongHandler}
            icon={faPlay}
            size="2x"
          />
        )}
        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
      </div>
      <audio ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
};

export default Player;
