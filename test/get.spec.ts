import {expect} from './header';
import {Flex} from '../src';

describe('get', () => {
    describe('for simple values', () => {
        it('must be returned as a promise', async () => {
            const a = await Flex.get(1);
            const b = Flex.get(2);
            expect(a).to.eq(1);
            expect(typeof b.then).to.eq('function');
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
            let err, name;
            const v = await Flex.get<number>(Promise.reject(123), {
                onError: (e: any, n?: string) => {
                    err = e;
                    name = n;
                }, name: 'hello'
            });
            expect(err).to.eq(123);
            expect(name).to.eq('hello');
            expect(v).to.be.undefined;
        });
    });
    describe('for value-returning callbacks', () => {
        it('must return the value', async () => {
            const a: string = await Flex.get(() => 'tst');
            const b: number = await Flex.get(() => 123, {
                onError: () => {
                }
            });
            expect(a).to.eq('tst');
            expect(b).to.eq(123);
        });
        it('must reject on errors', async () => {
            let err: any;
            await Flex.get(() => {
                throw 'ops!';
            }).catch(e => {
                err = e;
            });
            expect(err).to.eq('ops!');
        });
        it('must redirect errors', async () => {
            let err1: any, err2: any;
            const onError = (e: any) => {
                err1 = e;
            };
            await Flex.get(() => {
                throw 'ops!';
            }, {onError}).catch(e => {
                err2 = e;
            });
            expect(err1).to.eq('ops!');
            expect(err2).to.be.undefined;
        });
    });
    describe('for promise-returning callbacks', () => {
        it('must return the value', async () => {
            const a: string = await Flex.get(() => Promise.resolve('tst'));
            expect(a).to.eq('tst');
        });
        it('must reject on errors', async () => {
            let err: any;
            await Flex.get(() => {
                return Promise.reject('ops!');
            }).catch(e => {
                err = e;
            });
            expect(err).to.eq('ops!');
        });
        it('must redirect errors', async () => {
            let err1: any, err2: any;
            const onError = (e: any) => {
                err1 = e;
            };
            await Flex.get(() => {
                return Promise.reject('ops!');
            }, {onError}).catch(e => {
                err2 = e;
            });
            expect(err1).to.eq('ops!');
            expect(err2).to.be.undefined;
        });
    });
});
