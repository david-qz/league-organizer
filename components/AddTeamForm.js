export default function createAddTeamForm(root, { handleAddTeam }) {
    const form = root.querySelector('form');
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(form);
        await handleAddTeam(
            formData.get('name'),
            formData.get('logo')
        );
    });

    return () => {};
}
