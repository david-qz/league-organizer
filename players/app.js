// Utils
import { protectPage } from '../utils.js';

// Services
import { getUser, signOut } from '../services/auth-service.js';

// Components
import createUser from '../components/User.js';
import createNavigation from '../components/Navigation.js';

// State
let user = null;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    if (protectPage(user)) return;

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

function display() {
    User({ user });
    Navigation();
}

handlePageLoad();
