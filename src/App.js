import React , {useState} from 'react'
import Player from "./Components/player";
import Song from "./Components/song";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/styles/App.scss";
import data from './utils'

function App() {

  const [songs,setSongs] = useState(data())
  const [currentSong,setCurrentsong] = useState(songs[6]);
  const [isPlaying,setIsPlaying] =useState(false);
  const [isDark,setIsDark] = useState(false);

const darkModeHandler = ()=>{
  if(isDark){
    setIsDark(false)
  }
  else{
    setIsDark(true)
    
  }
}
  return (
    <div className="App" style={isDark ? {backgroundColor:'Black',color:'#2be09e'}: {}}>
     

      <Song currentSong={currentSong}/>
      <Player  currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
      <div className="text-center">
      <Button onClick={darkModeHandler} className="btn btn-dark d">
              Dark mode 
      </Button>
      </div>
    </div>
  );
}

export default App;
