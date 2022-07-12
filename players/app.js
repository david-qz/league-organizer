// Utils
import { protectPage } from '../utils.js';

// Services
import { getUser, signOut } from '../services/auth-service.js';
import { getPlayers } from '../services/league-service.js';

// Components
import createUser from '../components/User.js';
import createNavigation from '../components/Navigation.js';
import createAddPlayerForm from '../components/AddPlayerForm.js';
import createPlayerList from '../components/PlayerList.js';

// State
let user = null;
let players = [];

// Gets a de-duped array of teams off the players array. Maybe I should just make a database query
// for this info since we're not mutating the team data itself on this page.
const teams = () => {
    const teamMap = players.map(x => x.team)
        .reduce((map, x) => map.set(x.id, x), new Map());
    return [...teamMap].map(x => x[1]);
};

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    if (protectPage(user)) return;

    players = await getPlayers() ?? [];

    display();
}

async function handleSignOut() {
    signOut();
}

// Components
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);
const Navigation = createNavigation(document.querySelector('#nav'));
const AddPlayerForm = createAddPlayerForm(document.querySelector('#add-player-form'));
const PlayerList = createPlayerList(document.querySelector('#player-list'));

function display() {
    User({ user });
    Navigation();
    AddPlayerForm({ teams: teams() });
    PlayerList({ players });
}

handlePageLoad();
