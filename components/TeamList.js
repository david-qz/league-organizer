import createTeamTable from './subcomponents/TeamTable.js';

export default function createTeamList(root, handleAddPlayer, handleDeletePlayer) {

    return ({ teams }) => {
        root.innerHTML = '';

        for (const team of teams) {
            const table = createTeamTable(team, handleAddPlayer, handleDeletePlayer);
            root.append(table);
        }
    };
}
