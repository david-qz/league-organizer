import { client } from './client.js';

const PLAYER_TABLE = 'players';
const TEAM_TABLE = 'teams';

export async function getPlayers() {
    const { data, error } = await client
        .from(PLAYER_TABLE)
        .select(`
            id,
            createdAt: created_at,
            name,
            teamId: team_id,
            team: ${TEAM_TABLE}(
                id,
                createdAt: created_at,
                name,
                avatar
            )
        `)
        .order('name');

    if (error) {
        logError('getPlayers()', error);
        return null;
    }

    return data;
}

export async function getTeams() {
    const { data, error } = await client
        .from(TEAM_TABLE)
        .select(`
            id,
            createdAt: created_at,
            name,
            avatar,
            ${PLAYER_TABLE}(
                id,
                createdAt: created_at,
                name,
                teamId: team_id
            )
        `)
        .order('name');

    if (error) {
        logError('getTeams()', error);
        return null;
    }

    return data;
}

export async function addPlayer(name, teamId) {
    const { data, error } = await client
        .from(PLAYER_TABLE)
        .insert({
            name: name,
            team_id: teamId
        })
        .single();

    // TODO: alias the incoming data

    if (error) {
        logError('addPlayer()', error);
        return null;
    }

    return data;
}

export async function deletePlayer(player) {
    const { data, error } = await client
        .from(PLAYER_TABLE)
        .delete()
        .match({ id: player.id });

    if (error) {
        logError('deletePlayer()', error);
        return null;
    }

    return data;
}

function logError(context, error) {
    // eslint-disable-next-line no-console
    console.error(`${context}: ${error.message}`);
}
