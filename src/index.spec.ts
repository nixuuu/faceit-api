import {expect} from 'chai';
import {GameId, Region} from "./models/models";
import {MissingParameter} from "./errors/missing-parameter";
import {FaceitAPI} from "./classes/faceit-api";

const strictGame = process.env.TEST_GAME as GameId;
const strictRegion = process.env.TEST_REGION as Region;
const games = Object.keys(GameId).map(key => GameId[key]) as GameId[];
const regions = Object.keys(Region).map(key => Region[key]) as Region[];
const testPlayerId = process.env.TEST_PLAYER_ID as string;
const testPlayerNickname = process.env.TEST_PLAYER_NICKNAME as string;
const playerCases = [undefined];
const limitCases = [20, 100];
const pageCases = [0, 20];
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
                                        expect(ranking).to.be.a('object', 'is object');
                                        expect(ranking.start).not.eq(undefined, 'start exists');
                                        expect(ranking.end).not.eq(undefined, 'end exists');
                                        expect(ranking.items).not.eq(undefined, 'items exists');
                                        if (playerId) {
                                            expect(ranking.position).not.eq(undefined, 'player position exists');
                                        } else {
                                            expect(ranking.start).to.be.eq(page * limit, 'page working');
                                        }
                                        expect(ranking.items).to.lengthOf.lessThan(limit + 1, 'has good items length');
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
                    expect(history).to.be.an('object');
                    expect(history.items).to.not.eq(undefined);
                    expect(history.start).to.not.eq(undefined);
                    expect(history.end).to.not.eq(undefined);
                    expect(history.items).to.lengthOf.least(0);
                    done();
                })
                .catch(done);
        });
        it(`should get match history for player ${testPlayerId} with limit 10 and offset 10`, (done) => {
            FaceitAPI.playerMatchHistory(testPlayerId, strictGame, {
                limit: 10,
                offset: 10
            }).then(history => {
                expect(history).to.be.an('object');
                expect(history.start).to.be.eq(10);
                expect(history.end).to.be.eq(history.start + 10);
                done();
            })
        });
    });

    describe("Games", () => {
        it('should get all games', (done) => {
            FaceitAPI.games()
                .then(games => {
                    expect(games).to.be.an('object', 'is object');
                    expect(games.items).to.lengthOf.least(0);
                    expect(games.start).to.not.eq(undefined);
                    expect(games.end).to.not.eq(undefined);
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
