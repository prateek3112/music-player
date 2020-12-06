import React , {useState} from 'react'
import Player from "./Components/player";
import Song from "./Components/song";
import "../src/styles/App.scss";
import data from './utils'

function App() {

  const [songs,setSongs] = useState(data())
  const [currentSong,setCurrentsong] = useState(songs[2]);
  const [isPlaying,setIsPlaying] =useState(false);
  return (
    <div className="App">
     

      <Song currentSong={currentSong}/>
      <Player  currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
    </div>
  );
}

export default App;
