import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getAllPlayers, getPlayerGames } from './services/playerService'

function App() {
  const [players, setPlayers] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [answer, setAnswer] = useState({})
  const [thisRandomStat, setThisRandomStat] = useState("")

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
    getPlayerGames(somePlayers[anotherRanNum]?.id)
      .then((playerStats) => {
        let stats = ["points", "rebounds", "assists", "blocks", "steals", "threes"]
        let statIndex = Math.floor(Math.random() * stats.length)
        setThisRandomStat(stats[statIndex]);
        let finalRanNum = Math.floor((Math.random() * playerStats.length))
        let statCheck = false;
        while (!statCheck) {
          if (playerStats[finalRanNum]?.[thisRandomStat] == 0 | playerStats[finalRanNum]?.[thisRandomStat] == "None")
          {
            finalRanNum = Math.floor(Math.random() * playerStats.length)
          }
          else {
            setAnswer(playerStats[finalRanNum]);
            statCheck = true;
          }
        }
      })
  }

  const chooseAnswer = (userAnswer, correctAnswer) => {
    if (userAnswer == correctAnswer) {
      window.alert("That's correct!")
    }
    else {
      window.alert("Nope! Guess again!")
    }
  }

  useEffect(() => {
    getAllPlayers().then((playerArray) => {
      pickRandomPlayers(playerArray);
    })
  }, []);


  return (
    <>
    <div>RIDDLE ME THIS, BALLER</div>

    <div>Which player racked up {answer?.[thisRandomStat]} {thisRandomStat} for the {answer?.teamName}?</div>
    {selectedPlayers.map((nba) => 
      <button id={'player-' + nba?.id} onClick={() => chooseAnswer(nba?.id, answer?.playerId)}>{nba?.name}</button>
    )}
    </>
  )
}

export default App
