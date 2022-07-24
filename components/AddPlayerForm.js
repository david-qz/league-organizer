export default function createAddPlayerForm(root, { handleAddPlayer }) {
    return ({ teams }) => {
        root.innerHTML = `
            <form>
                <label>
                    Name
                    <input required name="name" placeholder="Name">
                </label>
                <label>
                    Team
                    <select required name="team">
                        <option value="" selected disabled>Select Team</option>
                    </select>
                </label>
                <button>Add Player</button>
            </form>
        `;

        const select = root.querySelector('select');
        for (const team of teams) {
            const option = document.createElement('option');
            select.append(option);
            option.value = team.id;
            option.textContent = team.name;
        }

        const form = root.querySelector('form');
        form.addEventListener('submit', async e => {
            e.preventDefault();

            const formData = new FormData(form);
            await handleAddPlayer(
                formData.get('name'),
                parseInt(formData.get('team'))
            );
        });
    };
}
