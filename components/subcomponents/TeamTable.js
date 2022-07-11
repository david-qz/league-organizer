export default function createTeamTable(team, { handleDeletePlayer }) {
    const table = document.createElement('table');
    table.append(createTableHead());
    table.append(createTableBody(team.players, handleDeletePlayer));

    return table;
}

function createTableHead() {
    const thead = document.createElement('thead');

    const headingTr = document.createElement('tr');
    thead.append(headingTr);

    const nameTd = headingTr.insertCell();
    nameTd.textContent = 'Name';

    const actionsTd = headingTr.insertCell();
    actionsTd.textContent = 'Actions';

    return thead;
}

function createTableBody(players, handleDeletePlayer) {
    const tbody = document.createElement('tbody');

    for (const player of players) {
        tbody.append(createPlayerRow(player, handleDeletePlayer));
    }

    return tbody;
}

function createPlayerRow(player, handleDeletePlayer) {
    const tr = document.createElement('tr');

    const nameTd = tr.insertCell();
    nameTd.textContent = player.name;

    const actionsTd = tr.insertCell();
    const deleteButton = document.createElement('button');
    actionsTd.append(deleteButton);
    deleteButton.textContent = 'delete';

    deleteButton.addEventListener('click', () => {
        handleDeletePlayer(player);
    });

    return tr;
}
