export const getAllPlayers = () => {
    return fetch(`http://localhost:8088/players`).then((res) => res.json());
};

export const getPlayerGames = (playerId) => {
    return fetch(`http://localhost:8088/games?playerId=${playerId}`).then((res) => res.json());
};


export const addRight = (id) => {
    fetch(`http://localhost:8088/users/${parseInt(id)}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            right: right + 1
                })
    })
}

export const addWrong = (id) => {
    fetch(`http://localhost:8088/users/${parseInt(id)}`, {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            wrong: wrong + 1
        })
    })
}