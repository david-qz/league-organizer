export default function createNavigation(root) {
    return () => {
        root.innerHTML = '';

        const teamsLink = document.createElement('a');
        root.append(teamsLink);
        teamsLink.textContent = 'Teams';
        teamsLink.href = '/';

        const playersLink = document.createElement('a');
        root.append(playersLink);
        playersLink.textContent = 'Players';
        playersLink.href = '/players/';

        for (const a of root.querySelectorAll('a')) {
            if (a.href === window.location.toString()) {
                a.classList.add('current');
            }
        }
    };
}
