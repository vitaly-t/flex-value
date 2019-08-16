import {expect} from './header';
import {Flex} from '../src';

describe('getSync', () => {
    describe('for simple values', () => {
        it('must be returned directly', () => {
            const a = Flex.getSync(123);
            const b = Flex.getSync<string>('hello');
            expect(a).to.eq(123);
            expect(b).to.eq('hello');
        });
    });
    describe('for promise values, without onError', () => {
        it('must throw', () => {

        });
    });
    describe('for promise values, with onError', () => {
        it('must pass error into the handler', () => {

        });
    });
    describe('for value-returning callbacks', () => {

    });
});
