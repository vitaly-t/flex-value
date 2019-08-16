import {expect} from './header';
import {getValue} from '../src/main';

describe('getValue', () => {
    describe('simple values', () => {
        it('must be returned directly', async () => {
            const a = await getValue(123);
            const b = await getValue<string>('hello');
            expect(a).to.eq(123);
            expect(b).to.eq('hello');
        });
    });
});
