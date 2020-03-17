import {RequestOptions} from "http";
import {GameData, GameId, Games, Match, Player, Rankings, Region} from "..";
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

    public static rankings(gameId: GameId, region: Region, options?: {
        playerId?: string;
        limit?: number;
        page?: number;
        offset?: number;
    }) {
        options = defaultsDeep(options, {limit: 20, offset: 0});
        if (options.page) {
            options.offset = options.limit * options.page;
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

    private static async request<T>(url: string, options?: RequestOptions): Promise<T> {
        options = defaultsDeep(options, this.ROOT_OPTIONS);
        const requestUrl = new URL(FaceitAPI.ROOT_URL + url);
        return await HttpHelper.request(requestUrl, options);
    }
}
