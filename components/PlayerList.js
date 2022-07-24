export default function createPlayerList(root) {
    return ({ players }) => {
        root.innerHTML = `
            <table>
                <thead>
                </thead>
                <tbody>
                </tbody>
            </table>
        `;

        const thead = root.querySelector('thead');
        const tbody = root.querySelector('tbody');

        const headerRow = document.createElement('tr');
        thead.append(headerRow);
        headerRow.insertCell().textContent = 'Name';
        headerRow.insertCell().textContent = 'Team';
        headerRow.insertCell().textContent = 'Date Joined';

        for (const player of players) {
            const row = document.createElement('tr');
            tbody.append(row);
            row.insertCell().textContent = player.name;
            row.insertCell().textContent = player.team.name;

            const joinDateString = new Date(player.createdAt).toLocaleDateString();
            row.insertCell().textContent = joinDateString;
        }
    };
}
