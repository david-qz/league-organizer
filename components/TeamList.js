import createTeamTable from './subcomponents/TeamTable.js';

export default function createTeamList(root, { handleAddPlayer, handleDeletePlayer }) {
    return ({ teams }) => {
        root.innerHTML = '';

        for (const team of teams) {
            const container = document.createElement('div');
            root.append(container);

            const heading = document.createElement('div');
            container.append(heading);
            heading.classList.add('table-heading');

            const img = document.createElement('img');
            img.src = team.avatar;
            img.alt = `${team.name} team logo`;

            heading.append(img, team.name);

            const table = createTeamTable(team, { handleDeletePlayer });
            container.append(table);

            const addPlayerForm = document.createElement('form');
            container.append(addPlayerForm);
            addPlayerForm.innerHTML = `
                <input name="name" placeholder="Name" required>
                <button>Add Player</button>
            `;
            addPlayerForm.classList.add('text-right');

            addPlayerForm.addEventListener('submit', async e => {
                e.preventDefault();
                const formData = new FormData(addPlayerForm);
                await handleAddPlayer(formData.get('name'), team);
            });
        }
    };
}
