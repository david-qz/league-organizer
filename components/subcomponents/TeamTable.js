export default function createTeamTable(team, handleAddPlayer, handleDeletePlayer) {
    const table = document.createElement('table');
    table.append(createTableHeading(team));

    const tbody = document.createElement('tbody');
    table.append(tbody);

    for (const player of team.players) {
        tbody.append(createPlayerRow(player));
    }

    return table;
}

function createTableHeading(team) {
    const thead = document.createElement('thead');

    const teamTr = document.createElement('tr');
    thead.append(teamTr);
    teamTr.classList.add('table-heading');

    const teamTd = document.createElement('td');
    teamTr.append(teamTd);
    teamTd.textContent = team.name;

    const headingTr = document.createElement('tr');
    thead.append(headingTr);

    const nameTd = document.createElement('td');
    headingTr.append(nameTd);
    nameTd.textContent = 'Name';

    return thead;
}

function createPlayerRow(player) {
    const tr = document.createElement('tr');

    const nameTd = document.createElement('td');
    tr.append(nameTd);
    nameTd.textContent = player.name;

    return tr;
}
