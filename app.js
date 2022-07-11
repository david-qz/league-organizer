// Utils
import { protectPage } from './utils.js';

// Services
import { getUser, signOut } from './services/auth-service.js';
import { getTeams } from './services/league-service.js';

// Components
import createUser from './components/User.js';
import createTeamList from './components/TeamList.js';

// State
let user = null;
let teams = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    if (protectPage(user)) return;

    teams = await getTeams();
    display();
}

async function handleSignOut() {
    signOut();
}

async function handleAddPlayer(name, team) {
    console.log(name, team.id);
}

// Components
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const TeamList = createTeamList(
    document.querySelector('#team-list'),
    { handleAddPlayer }
);

function display() {
    User({ user });
    TeamList({ teams });
}

handlePageLoad();
