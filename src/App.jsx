import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getAllPlayers } from './services/playerService'

function App() {
  const [players, setPlayers] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [answer, setAnswer] = useState({})

  const pickRandomPlayers = (playerArray) => {
    let somePlayers = [];
    let someIndexes = []
    for (let i = 0; i < 4; i++) {
      let ranNum = Math.floor((Math.random() * playerArray.length));
      if (someIndexes.includes(ranNum)) {
        ranNum = Math.floor((Math.random() * playerArray.length));
        somePlayers.push(playerArray[ranNum]);
      } else {
        somePlayers.push(playerArray[ranNum]);
      }
    }
    setSelectedPlayers(somePlayers);
    let anotherRanNum = Math.floor(Math.random() * 4)
    setAnswer(somePlayers[anotherRanNum]);
  }


  useEffect(() => {
    getAllPlayers().then((playerArray) => {
      setPlayers(playerArray);
      pickRandomPlayers(playerArray);
    })
  }, []);


  return (
    <>
    <div>RIDDLE ME THIS, BALLER</div>

    <div>{answer?.name}</div>
    {selectedPlayers.map((nba) => 
      <button id={'player-' + nba?.id}>{nba?.name}</button>
    )}
    </>
  )
}

export default App
