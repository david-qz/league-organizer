// Utils
import { protectPage } from '../utils.js';

// Services
import { getUser, signOut } from '../services/auth-service.js';
import { getPlayers } from '../services/league-service.js';

// Components
import createUser from '../components/User.js';
import createNavigation from '../components/Navigation.js';
import createPlayerList from '../components/PlayerList.js';

// State
let user = null;
let players = [];

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

const PlayerList = createPlayerList(document.querySelector('#player-list'));

function display() {
    User({ user });
    Navigation();
    PlayerList({ players });
}

handlePageLoad();
