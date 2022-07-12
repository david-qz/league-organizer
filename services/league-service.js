import { snakeToCamelRecursive } from '../utils.js';
import { client, unwrapResponse } from './client.js';

const PLAYER_TABLE = 'players';
const TEAM_TABLE = 'teams';

export async function getPlayers() {
    const response = await client
        .from(PLAYER_TABLE)
        .select(`
            *,
            team: ${TEAM_TABLE}(*)
        `)
        .order('name');

    const data = unwrapResponse(response);
    if (data) snakeToCamelRecursive(data);

    return data;
}

export async function getTeams() {
    const response = await client
        .from(TEAM_TABLE)
        .select(`
            *,
            ${PLAYER_TABLE}(*)
        `)
        .order('name');

    const data = unwrapResponse(response);
    if (data) snakeToCamelRecursive(data);

    return data;
}

export async function addPlayer(name, teamId) {
    const response = await client
        .from(PLAYER_TABLE)
        .insert({
            name: name,
            team_id: teamId
        })
        .single();

    const data = unwrapResponse(response);
    if (data) snakeToCamelRecursive(data);

    return data;
}

export async function deletePlayer(player) {
    const response = await client
        .from(PLAYER_TABLE)
        .delete()
        .match({ id: player.id })
        .single();

    const data = unwrapResponse(response);
    if (data) snakeToCamelRecursive(data);

    return data;
}
