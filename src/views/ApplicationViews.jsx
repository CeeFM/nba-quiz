import { useEffect, useState } from 'react'
import { addRight, addWrong, getAllPlayers, getPlayerGames } from '../services/PlayerServices'


function ApplicationViews() {
    const [players, setPlayers] = useState([])
    const [selectedPlayers, setSelectedPlayers] = useState([])
    const [answer, setAnswer] = useState({})
    const [thisRandomStat, setThisRandomStat] = useState("")

    const localBballUser = localStorage.getItem("bball_user")
    const bballUserObject = JSON.parse(localBballUser)

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
                    if (playerStats[finalRanNum]?.[thisRandomStat] == 0 | playerStats[finalRanNum]?.[thisRandomStat] == "None") {
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
            window.alert("That's correct!");
            addRight(bballUserObject?.id);

        }
        else {
            window.alert("Nope! Guess again!");
            addWrong(bballUserObject?.id);
        }
    }

    useEffect(() => {
        getAllPlayers().then((playerArray) => {
            pickRandomPlayers(playerArray);
        })
    }, []);


    return (
        <>
            <h4>RIDDLE ME THIS, BALLER</h4>
            <br />
            <div>Which player racked up <strong>{answer?.[thisRandomStat]} {thisRandomStat}</strong> for the <strong>{answer?.teamName}?</strong></div>
            {selectedPlayers.map((nba) =>
                <button id={'player-' + nba?.id} onClick={() => chooseAnswer(nba?.id, answer?.playerId)}>{nba?.name}</button>
            )}

            <button onClick={() => console.log(bballUserObject?.id)}>TEST LOGIN ID</button>
        </>
    )
}

export default ApplicationViews
