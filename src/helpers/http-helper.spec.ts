import {HttpHelper} from "./http-helper";
import {URL} from 'url';
import {expect} from 'chai';

describe('HttpHelper', () => {
    describe("#createQueryString()", () => {
        it('should return string', () => {
            const query = HttpHelper.createQueryString({});
            expect(query).to.be.an('string', 'is string');
        });
        it('should start with ?', () => {
            const query = HttpHelper.createQueryString({});
            expect(query).to.match(/^\?/, 'is starting with ?');
        });
        it('should contain property query string', () => {
            const query = HttpHelper.createQueryString({
                a: 0,
                b: 'c',
                c: true,
                d: {},
                e: [],
            });
            expect(query).to.be.an('string', 'is string');
            expect(query).to.match(/a=0/, `good 'a' param`);
            expect(query).to.match(/b=c/, `good 'b' param`);
            expect(query).to.match(/c=true/, `good 'c' param`);
            expect(query).to.match(/d={}/, `good 'd' param`);
            expect(query).to.match(/e=\[\]/, `good 'e' param`);
        });
    });
    describe('#request()', () => {
        it('should make http request to google', (done) => {
            HttpHelper.request(new URL('http://google.com'), {json: false})
                .then(_ => done())
                .catch(done);
        });
        it('should make https request to google', (done) => {
            HttpHelper.request(new URL('https://google.com'), {json: false})
                .then(_ => done())
                .catch(done);
        });
        it('should return 404', (done) => {
            HttpHelper.request(new URL('http://google.com/404'), {json: false})
                .then(_ => done(new Error('Should not pass')))
                .catch(_ => done());
        });
        it('should return json response', done => {
            HttpHelper.request<{ip: string}>(new URL('https://api.ipify.org?format=json'))
                .then(res => {
                    expect(res).to.be.an('object');
                    expect(res.ip).to.be.an('string');
                    done();
                })
                .catch(done);
        })
    });
});
