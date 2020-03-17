import {config} from 'dotenv';
config();
import {expect} from 'chai';
import {ArrayResponse, GameId, Region} from "../models/models";
import {MissingParameter} from "../errors/missing-parameter";
import {FaceitAPI} from "./faceit-api";

const strictGame = process.env.TEST_GAME as GameId;
const strictRegion = process.env.TEST_REGION as Region;
const games = Object.keys(GameId).map(key => GameId[key]) as GameId[];
const regions = Object.keys(Region).map(key => Region[key]) as Region[];
const testPlayerId = process.env.TEST_PLAYER_ID as string;
const testPlayerNickname = process.env.TEST_PLAYER_NICKNAME as string;
const playerCases = [undefined];
const limitCases = [20, 100];
const pageCases = [1, 2];
if (testPlayerId) playerCases.push(testPlayerId);

describe("FaceitAPI", () => {
    beforeEach(function () {
        this.retries(10);
    });
    describe('Regions', () => {
        games.forEach(game => {
            if (strictGame && strictGame !== game) {
                return;
            }
            playerCases.forEach(playerId => {
                regions.forEach(region => {
                    if (strictRegion && strictRegion !== region) {
                        return;
                    }
                    limitCases.forEach(limit => {
                        pageCases.forEach(page => {
                            it(`should get rankings for ${game} in ${region} with limit: ${limit}, offset ${page}${playerId ? ` for player ${playerId}` : ''}`, function (done) {
                                const request = FaceitAPI.rankings(game, region, {playerId, page, limit});
                                expect(request).to.be.a('promise');
                                request
                                    .then(ranking => {
                                        if (playerId) {
                                            checkArrayResponse(ranking);
                                            expect(ranking.position).not.eq(undefined, 'player position exists');
                                        } else {
                                            checkArrayResponse(ranking, limit, (page - 1) * limit);
                                        }
                                        done();
                                    })
                                    .catch(done);
                            });
                        });
                    });
                });
            });
        });
    });

    describe('Players', () => {
        if (testPlayerNickname) {
            it(`should receive player by nickname ${testPlayerNickname}`, (done) => {
                FaceitAPI.players({nickname: testPlayerNickname}).then(_ => done()).catch(done);
            });
        }
        if (testPlayerId) {
            it(`should receive player by id ${testPlayerId}`, (done) => {
                FaceitAPI.players({playerId: testPlayerId}).then(_ => done()).catch(done);
            })
        }

        it(`should throw exception for no params`, function (done) {
            try {
                FaceitAPI.players({});
                done(new Error('Should not pass'));
            } catch (err) {
                if (err.name === 'MissingParameter') {
                    done();
                } else {
                    done(err);
                }
            }
        });
        it(`should throw exception for no playerGameId`, function (done) {
            try {
                FaceitAPI.players({game: strictGame || GameId.Csgo});
                done(new Error('Should not pass'));
            } catch (err) {
                if (err.name === 'MissingParameter') {
                    done();
                } else {
                    done(err);
                }
            }
        });
        it(`should throw exception for no gameId`, function (done) {
            try {
                FaceitAPI.players({playerGameId: 'player'});
                done(new Error('Should not pass'));
            } catch (err) {
                if (err.name === 'MissingParameter') {
                    done();
                } else {
                    done(err);
                }
            }
        });
        it(`should get match history for player ${testPlayerId}`, (done) => {
            FaceitAPI.playerMatchHistory(testPlayerId, strictGame)
                .then(history => {
                    checkArrayResponse(history);
                    done();
                })
                .catch(done);
        });
        it(`should get match history for player ${testPlayerId} with limit 10 and offset 10`, (done) => {
            FaceitAPI.playerMatchHistory(testPlayerId, strictGame, {
                limit: 10,
                offset: 10
            }).then(history => {
                checkArrayResponse(history, 10, 10);
                done();
            })
        });

        it(`should get hubs of player ${testPlayerId}`, (done) => {
            FaceitAPI.playerHubs(testPlayerId)
                .then(response => {
                    checkArrayResponse(response);
                    done();
                })
                .catch(done);
        });
        it(`should get hubs of player ${testPlayerId} with offset 1`, (done) => {
            FaceitAPI.playerHubs(testPlayerId, {limit: 1, offset: 1})
                .then(response => {
                    checkArrayResponse(response, 1, 1);
                    done();
                })
                .catch(done);

        });
        it(`should get tournaments of player ${testPlayerId}`, (done) => {
            FaceitAPI.playerTournaments(testPlayerId)
                .then(tournaments => {
                    checkArrayResponse(tournaments);
                    done();
                })
                .catch(done);
        });
        it(`should get player ${testPlayerId} stats for game ${strictGame}`, (done) => {
            FaceitAPI.playerGameStats(testPlayerId, strictGame)
                .then(stats => {
                    expect(stats).to.be.an('object');
                    expect(stats.game_id).to.be.eq(strictGame);
                    expect(stats.player_id).to.be.eq(testPlayerId);
                    done();
                })
                .catch(done);
        })
    });

    describe("Games", () => {
        it('should get all games', (done) => {
            FaceitAPI.games()
                .then(games => {
                    checkArrayResponse(games);
                    done();
                })
                .catch(done);
        });
        games.forEach(game => {
            it(`Should get data for ${game}`, (done) => {
                FaceitAPI.game(game).then(_ => done()).catch(done);
            });
            it(`Should get parent data for ${game}`, (done) => {
                FaceitAPI.game(game, true).then(_ => done()).catch(done);
            })
        });
    });
});

function checkArrayResponse<T>(response: ArrayResponse<T>, limit?: number, offset?: number) {
    expect(response).to.be.an('object');
    expect(response.start).to.not.be.eq(undefined);
    expect(response.end).to.not.be.eq(undefined);
    expect(response.items).to.not.be.eq(undefined);

    if (typeof limit === 'number') {
        expect(response.items).to.lengthOf.lessThan(limit + 1);
        expect(response.end).to.be.lessThan(response.start + limit + 1);
    }

    if (typeof offset === 'number') {
        expect(response.start).to.be.closeTo(offset, 1);
    }
}
