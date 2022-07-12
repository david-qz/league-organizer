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

    const dateTd = headingTr.insertCell();
    dateTd.textContent = 'Date Joined';

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

    const dateTd = tr.insertCell();
    dateTd.textContent = new Date(player.createdAt).toLocaleDateString();

    const actionsTd = tr.insertCell();
    actionsTd.classList.add('text-center');

    const deleteButton = document.createElement('button');
    actionsTd.append(deleteButton);
    deleteButton.classList.add('contents-button');

    deleteButton.addEventListener('click', () => {
        handleDeletePlayer(player);
    });

    const trashIcon = document.createElement('i');
    deleteButton.append(trashIcon);
    trashIcon.classList.add('fa-regular', 'fa-trash-can', 'fa-lg');

    return tr;
}
