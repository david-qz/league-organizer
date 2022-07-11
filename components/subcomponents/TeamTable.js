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

    const nameTd = document.createElement('td');
    headingTr.append(nameTd);
    nameTd.textContent = 'Name';

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

    const nameTd = document.createElement('td');
    tr.append(nameTd);
    nameTd.textContent = player.name;

    // TODO: create a delete button

    return tr;
}
