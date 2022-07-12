import { client, unwrapResponse } from './client.js';

const PLAYER_TABLE = 'players';
const TEAM_TABLE = 'teams';

export async function getPlayers() {
    const response = await client
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

    return unwrapResponse(response);
}

export async function getTeams() {
    const response = await client
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

    return unwrapResponse(response);
}

export async function addPlayer(name, teamId) {
    const response = await client
        .from(PLAYER_TABLE)
        .insert({
            name: name,
            team_id: teamId
        })
        .single();

    // TODO: alias the incoming data

    return unwrapResponse(response);
}

export async function deletePlayer(player) {
    const response = await client
        .from(PLAYER_TABLE)
        .delete()
        .match({ id: player.id });

    return unwrapResponse(response);
}
