import { useEffect, useState } from 'react'
import { addRight, addWrong, getAllPlayers, getPlayerGames } from '../services/PlayerServices'


function QuizHard() {
    const [players, setPlayers] = useState([])
    const [selectedPlayers, setSelectedPlayers] = useState([])
    const [answer, setAnswer] = useState({})
    const [currentScore, setCurrentScore] = useState(0)
    const [thisRandomStat, setThisRandomStat] = useState("")

    let localBballUser = localStorage.getItem("bball_user")
    let bballUserObject = JSON.parse(localBballUser)

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
                setAnswer(playerStats[finalRanNum]);

            })
    }

    const chooseAnswer = (userAnswer, correctAnswer) => {
        if (userAnswer == correctAnswer) {
            localStorage.setItem("bball_user", JSON.stringify({
                id: bballUserObject.id,
                right: bballUserObject.right + 1,
                wrong: bballUserObject.wrong,
                username: bballUserObject.username,
                teamName: bballUserObject.teamName,
                fullName: bballUserObject.fullName
            }))
            localBballUser = localStorage.getItem("bball_user")
            bballUserObject = JSON.parse(localBballUser)
            window.alert(`That's correct!`);
            addRight(bballUserObject?.id, bballUserObject?.right);
            setCurrentScore(currentScore + 1);
            getAllPlayers().then((playerArray) => {
                pickRandomPlayers(playerArray);
            })

        }
        else {
            localStorage.setItem("bball_user", JSON.stringify({
                id: bballUserObject.id,
                right: bballUserObject.right,
                wrong: bballUserObject.wrong + 1,
                username: bballUserObject.username,
                teamName: bballUserObject.teamName,
                fullName: bballUserObject.fullName
            }))
            localBballUser = localStorage.getItem("bball_user")
            bballUserObject = JSON.parse(localBballUser)
            window.alert("Nope! Guess again!");
            addWrong(bballUserObject?.id, bballUserObject?.wrong);
            setCurrentScore(currentScore - 1)
        }
    }

    useEffect(() => {
        getAllPlayers().then((playerArray) => {
            pickRandomPlayers(playerArray);
        })
    }, []);


    return (
        <>
            <h1>Which player racked up <strong>{answer?.[thisRandomStat]} {thisRandomStat}</strong>?</h1>
            <div style={{ margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
                {selectedPlayers.map((nba) => (
                    <div key={nba.id} style={{ width: "45%", marginBottom: "1rem", textAlign: "center" }}>
                        <button onClick={() => chooseAnswer(nba?.id, answer?.playerId)}><img src={nba?.img} alt={nba?.name + " picture"} style={{ width: "auto", height: "20vh" }} /></button>
                        <br />
                        <button id={'player-' + nba?.id} onClick={() => chooseAnswer(nba?.id, answer?.playerId)}>{nba?.name}</button>
                    </div>
                ))}
            </div>
            <br />
            <h2>{bballUserObject?.username}'s current score: {currentScore}</h2>
            <h4>{bballUserObject?.username}'s lifetime score: {bballUserObject?.right - bballUserObject?.wrong} (Right answers: {bballUserObject?.right}, Wrong answers: {bballUserObject?.wrong})</h4>
        </>
    )
}

export default QuizHard
