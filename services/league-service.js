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

export async function addTeam(team) {
    const response = await client
        .from(TEAM_TABLE)
        .insert(team)
        .single();

    const data = unwrapResponse(response);
    if (data) snakeToCamelRecursive(data);

    return data;
}

export async function uploadTeamLogo(teamName, logoFile) {
    const bucketName = 'avatars';
    const ext = logoFile.type.split('/')[1];
    const filename = `${teamName}-logo.${ext}`;

    // Using upsert false to prevent the user from overwriting another team's image by creating
    // a team with the same name.
    // TODO: handle same named teams with different avatars (or prohibit duplicate names elsewhere).
    const response = await client.storage
        .from(bucketName)
        .upload(filename, logoFile, {
            cacheControl: '3600',
            upsert: false
        });

    if (unwrapResponse(response) === null)
        return null;

    const { data } = await client.storage
        .from(bucketName)
        .getPublicUrl(filename);

    return data.publicURL;
}
