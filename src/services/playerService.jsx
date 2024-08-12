export const getAllPlayers = () => {
    return fetch(`http://localhost:8088/players`).then((res) => res.json());
};