import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getAllPlayers } from './services/playerService'

function App() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    getAllPlayers().then((playerArray) => {
      setPlayers(playerArray);
    })
  }, []);


  return (
    <>
    <p>hello</p>
    {players.map((nba) => 
      <div>{nba?.name}</div>
    )}
    </>
  )
}

export default App
