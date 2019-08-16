import {expect} from './header';
import {getValue} from '../src/main';

describe('getValue', () => {
    describe('for simple values', () => {
        it('must be returned directly', async () => {
            const a = await getValue(123);
            const b = await getValue<string>('hello');
            expect(a).to.eq(123);
            expect(b).to.eq('hello');
        });
    });
    describe('for promises', () => {
        it('must resolve directly', async () => {
            const a = await getValue(Promise.resolve(123));
            expect(a).to.eq(123);
        });
        it('must reject without onError specified', async () => {
            let err;
            await getValue(Promise.reject(123)).catch(e => {
                err = e;
            });
            expect(err).to.eq(123);
        });
        it('must resolve with onError specified', async () => {
            const v = await getValue<number>(Promise.reject(123), {onError: () => 456});
            expect(v).to.eq(456);
        });
        it('must pass in the error correctly', async () => {
            let err;
            const v = await getValue<number>(Promise.reject(123), {
                onError: e => {
                    err = e;
                }
            });
            expect(err).to.eq(123);
            expect(v).to.be.undefined;
        });
    });
});
