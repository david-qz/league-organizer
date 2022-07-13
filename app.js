// Utils
import { protectPage, lexicographicCompare } from './utils.js';

// Services
import { getUser, signOut } from './services/auth-service.js';
import { getTeams, addPlayer, deletePlayer, addTeam, uploadTeamLogo } from './services/league-service.js';

// Components
import createUser from './components/User.js';
import createNavigation from './components/Navigation.js';
import createTeamList from './components/TeamList.js';
import createAddTeamForm from './components/AddTeamForm.js';

// State
let user = null;
let teams = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    if (protectPage(user)) return;

    teams = await getTeams() ?? [];
    display();
}

async function handleSignOut() {
    signOut();
}

async function handleAddPlayer(name, team) {
    const teamId = team.id;

    const newPlayer = await addPlayer(name, teamId);
    if (newPlayer) {
        teams.find(val => val.id === teamId)?.players.push(newPlayer);
    }

    display();
}

async function handleDeletePlayer(player) {
    const deletedPlayer = await deletePlayer(player);

    if (deletedPlayer) {
        const teamPlayers = teams.find(val => val.id === player.teamId)?.players;
        const index = teamPlayers.indexOf(player);
        if (index !== -1) teamPlayers.splice(index, 1);
    }

    display();
}

async function handleAddTeam(name, logoFile) {
    const team = { name };

    if (logoFile.size > 0) {
        let logoUrl = await uploadTeamLogo(name, logoFile);
        if (logoUrl) team.avatar = logoUrl;
    }

    const newTeam = await addTeam(team);

    if (newTeam) {
        newTeam.players = [];
        teams.push(newTeam);
    }

    display();
}

// Components
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);
const Navigation = createNavigation(document.querySelector('#nav'));
const TeamList = createTeamList(
    document.querySelector('#team-list'),
    { handleAddPlayer, handleDeletePlayer }
);
const AddTeamForm = createAddTeamForm(document.querySelector('#add-team-form'), {
    handleAddTeam
});

function display() {
    teams.sort((a, b) => lexicographicCompare(a.name, b.name));
    User({ user });
    Navigation();
    TeamList({ teams });
    AddTeamForm();
}

handlePageLoad();
