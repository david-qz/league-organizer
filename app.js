// Utils
import { protectPage } from './utils.js';

// Services
import { getUser, signOut } from './services/auth-service.js';
import { addPlayer, getTeams } from './services/league-service.js';

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
    const teamId = team.id;

    const newPlayer = await addPlayer(name, teamId);
    teams.find(val => val.id === teamId)?.players.push(newPlayer);

    display();
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
