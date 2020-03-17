import {RequestOptions} from "http";
import {
    GameData,
    GameId,
    Games,
    Hub,
    Match,
    Player,
    PlayerHub,
    PlayerStats,
    Rankings,
    Region, SearchOptions,
    SearchType,
    Tournament
} from "..";
import {MissingParameter} from "..";
import {HttpHelper} from "..";
import {defaultsDeep} from "lodash";
import {URL} from "url";

export class FaceitAPI {
    private static ROOT_URL = 'https://open.faceit.com/data/v4';
    private static ROOT_OPTIONS: RequestOptions = {
        headers: {
            'Authorization': `Bearer ${process.env.FACEIT_API_KEY}`,
            'Accept': 'application/json'
        }
    };

    // TODO: /championships/{championship_id}
    public static championship(championshipId: string) { }

    // TODO: /championships/{championship_id}/matches
    public static championshipMatches(championshipId: string) { }

    // TODO: /championships/{championship_id}/subscriptions
    public static championshipSubscriptions(championshipId: string) { }

    // TODO: /leaderboards/championships/{championship_id}/groups/{group}
    public static championshipLeaderboards(championshipId: string, group?: string) { }

    public static games() {
        return this.request<Games>(`/games`);
    }

    public static game(game: GameId, parent?: boolean) {
        let url = `/games/${game}`;
        if (parent) {
            url += '/parent';
        }
        return this.request<GameData>(url);
    }

    // TODO: /hubs/{hub_id}
    public static hub(hubId: string) { }

    // TODO: /hubs/{hub_id}/matches
    public static hubMatches(hubId: string) { }

    // TODO: /hubs/{hub_id}/members
    public static hubMembers(hubId: string) { }

    // TODO: /hubs/{hub_id}/roles
    public static hubMembersRoles(hubId: string) { }

    // TODO: /hubs/{hub_id}/rules
    public static hubRules(hubId: string) { }

    // TODO: /hubs/{hub_id}/stats
    public static hubStats(hubId: string) { }

    // TODO: /leaderboards/hubs/{hub_id} /leaderboards/hubs/{hub_id}/general /leaderboards/hubs/{hub_id}/seasons/{season}
    public static hubLeaderboards(hubId: string, type?: 'general'|'seasons', season?: string) { }

    // TODO: /leaderboards/{leaderboard_id}
    public static leaderboard(leaderboardId: string) { }

    // TODO: /matches/{match_id}
    public static match(matchId: string) { }

    // TODO: /matches/{match_id}/stats
    public static matchStats(matchId: string) { }

    // TODO: /organizers/{?organizer_id}
    public static organizer(options: {name?: string; organizerId?: string}) { }

    // TODO: /organizers/{organizer_id}/championships
    public static organizerChampionships(organizerId: string) { }

    // TODO: /organizers/{organizer_id}/games
    public static organizerGames(organizerId: string) { }

    // TODO: /organizers/{organizer_id}/hubs
    public static organizerHubs(organizerId: string) { }

    // TODO: /organizers/{organizer_id}/tournaments
    public static organizerTournaments(organizerId: string) { }

    public static players(options: {
        game?: GameId,
        nickname?: string;
        playerGameId?: string;
        playerId?: string;
    }) {
        if (!options.game && !options.playerGameId && !options.nickname && !options.playerId) {
            throw new MissingParameter('You must specify nickname or playerId or playerGameId and game');
        } else if (!options.nickname && !options.playerGameId && !options.playerId) {
            throw new MissingParameter('You must specify nickname or playerGameId');
        } else if (options.playerGameId && !options.game) {
            throw new MissingParameter('You must specify game for playerGameId')
        }
        let url = `/players`;
        if (options.playerId) {
            url = `/players/${options.playerId}`
        } else {
            url += HttpHelper.createQueryString({
                game: options.game,
                nickname: options.nickname,
                game_player_id: options.playerGameId
            });
        }

        return this.request<Player>(url);
    }

    public static playerMatchHistory(playerId: string, game: GameId, options?: {
        from?: number;
        to?: number;
        offset?: number;
        limit?: number;
    }) {
        const url = `/players/${playerId}/history` + HttpHelper.createQueryString(options);
        return this.request<Match>(url);
    }

    public static playerHubs(playerId: string, options?: {offset?: number; limit?: number;}) {
        const url = `/players/${playerId}/hubs` + HttpHelper.createQueryString(options);
        return this.request<PlayerHub>(url);
    }

    public static playerGameStats(playerId: string, game: GameId) {
        const url = `/players/${playerId}/stats/${game}`;
        return this.request<PlayerStats>(url);
    }

    public static playerTournaments(playerId: string, options?: {offset?: number; limit?: number}) {
        const url = `/players/${playerId}/tournaments` + HttpHelper.createQueryString(options);
        return this.request<Tournament>(url);
    }

    public static rankings(gameId: GameId, region: Region, options?: {
        playerId?: string;
        limit?: number;
        page?: number;
        offset?: number;
    }) {
        options = defaultsDeep(options, {limit: 20, offset: 0});
        if (options.page) {
            options.offset = options.limit * (options.page - 1);
            delete options.page;
        }
        let url: string | URL = `/rankings/games/${gameId}/regions/${region}`;
        if (options.playerId) {
            url += `/players/${options.playerId}`;
            delete options.playerId;
        }
        url += HttpHelper.createQueryString(options);
        return this.request<Rankings>(url);
    }

    // TODO: /search/{type}
    public static search(query: string, type: SearchType, options: SearchOptions) { }

    private static async request<T>(url: string, options?: RequestOptions): Promise<T> {
        options = defaultsDeep(options, this.ROOT_OPTIONS);
        const requestUrl = new URL(FaceitAPI.ROOT_URL + url);
        return await HttpHelper.request(requestUrl, options);
    }
}
