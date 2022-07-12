export default function createAddPlayerForm(root) {
    return ({ teams }) => {
        root.innerHTML = `
            <form>
                <label>
                    Name
                    <input required name="name" placeholder="player name">
                </label>
                <label>
                    Team
                    <select name="team">
                        <option required value="" selected disabled></option>
                    </select>
                </label>
                <button>add</button>
            </form>
        `;

        const select = root.querySelector('select');
        for (const team of teams) {
            const option = document.createElement('option');
            select.append(option);
            option.value = team.id;
            option.textContent = team.name;
        }
    };
}
