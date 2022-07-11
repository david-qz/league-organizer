import createTeamTable from './subcomponents/TeamTable.js';

export default function createTeamList(root, handleAddPlayer, handleDeletePlayer) {
    return ({ teams }) => {
        root.innerHTML = '';

        for (const team of teams) {
            const container = document.createElement('div');
            root.append(container);

            const heading = document.createElement('div');
            container.append(heading);
            heading.classList.add('table-heading');
            heading.textContent = team.name;

            const table = createTeamTable(team, handleAddPlayer, handleDeletePlayer);
            container.append(table);
        }
    };
}
