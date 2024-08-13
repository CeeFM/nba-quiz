export const getAllPlayers = () => {
    return fetch(`http://localhost:8088/players`).then((res) => res.json());
};

export const getPlayerGames = (playerId) => {
    return fetch(`http://localhost:8088/games?playerId=${playerId}`).then((res) => res.json());
};