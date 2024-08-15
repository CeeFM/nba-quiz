export const getAllPlayers = () => {
    return fetch(`http://localhost:8088/players`).then((res) => res.json());
};

export const getPlayerGames = (playerId) => {
    return fetch(`http://localhost:8088/games?playerId=${playerId}`).then((res) => res.json());
};


const printId = (id) => {
    fetch(`http://localhost:8088/userTeam/${parseInt(id)}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            playerId: randomNumber(),
            swap: true
        })
    })
}