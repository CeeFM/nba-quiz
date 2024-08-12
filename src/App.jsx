import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getAllPlayers } from './services/playerService'

function App() {
  const [players, setPlayers] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])

  const pickRandomPlayers = (playerArray) => {
    let somePlayers = [];
    let someIndexes = []
    for (let i = 0; i < 4; i++) {
      let ranNum = Math.floor((Math.random() * playerArray.length) + 1);
      if (someIndexes.includes(ranNum)) {
        ranNum = Math.floor((Math.random() * playerArray.length) + 1);
        somePlayers.push(playerArray[ranNum]);
      } else {
        somePlayers.push(playerArray[ranNum]);
      }
    }
    setSelectedPlayers(somePlayers);

  }


  useEffect(() => {
    getAllPlayers().then((playerArray) => {
      setPlayers(playerArray);
      pickRandomPlayers(playerArray);
    })
  }, []);


  return (
    <>
    <p>hello</p>
    {selectedPlayers.map((nba) => 
      <div>{nba?.name}</div>
    )}
    </>
  )
}

export default App
