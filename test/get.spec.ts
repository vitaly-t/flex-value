import {expect} from './header';
import {Flex} from '../src';

describe('get', () => {
    describe('for simple values', () => {
        it('must be returned directly', async () => {
            const a = await Flex.get(123);
            const b = await Flex.get<string>('hello');
            expect(a).to.eq(123);
            expect(b).to.eq('hello');
        });
    });
    describe('for promises', () => {
        it('must resolve directly', async () => {
            const a = await Flex.get(Promise.resolve(123));
            expect(a).to.eq(123);
        });
        it('must reject without onError specified', async () => {
            let err;
            await Flex.get(Promise.reject(123)).catch(e => {
                err = e;
            });
            expect(err).to.eq(123);
        });
        it('must resolve with onError specified', async () => {
            const v = await Flex.get<number>(Promise.reject(123), {onError: () => 456});
            expect(v).to.eq(456);
        });
        it('must pass in the error correctly', async () => {
            let err;
            const v = await Flex.get<number>(Promise.reject(123), {
                onError: e => {
                    err = e;
                }
            });
            expect(err).to.eq(123);
            expect(v).to.be.undefined;
        });
    });
    describe('for value-returning callbacks', () => {
        it('must return the value directly', async () => {
            const a: string = await Flex.get(() => 'tst');
            expect(a).to.eq('tst');
        });
        it('must redirect errors', () => {

        });
    });
    describe('for promise-returning callbacks', () => {

    });
});
