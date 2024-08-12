import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getAllPlayers } from './services/playerService'

function App() {
  const [count, setCount] = useState(0)
  const [players, setPlayers] = useState([])

  useEffect(() => {
    getAllPlayers().then((playerArray) => {
      setPlayers(playerArray);
    })
  }, []);


  return (
    <>
    {players.map((baller) => {
       <p>baller?.name</p>
    })}
    </>
  )
}

export default App
