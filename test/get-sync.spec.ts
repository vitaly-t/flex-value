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
        it('must throw without name', () => {
            expect(() => {
                Flex.getSync(Promise.resolve(123));
            }).to.throw('Value cannot be asynchronous.');
        });
        it('must throw with name', () => {
            expect(() => {
                Flex.getSync(Promise.resolve(123), {name: 'hello'});
            }).to.throw('Value "hello" cannot be asynchronous.');
        });

    });
    describe('for promise values, with onError', () => {
        it('must pass error without name', () => {
            let err: any, name;
            Flex.getSync(Promise.resolve(123), {
                onError: (e, n) => {
                    err = e;
                    name = n;
                }
            });
            expect(err instanceof Error).to.be.true;
            expect(err.message).to.eq('Value cannot be asynchronous.');
            expect(name).to.be.undefined;
        });
        it('must pass error with name', () => {
            let err: any, name;
            Flex.getSync(Promise.resolve(123), {
                onError: (e, n) => {
                    err = e;
                    name = n;
                },
                name: 'hello'
            });
            expect(err instanceof Error).to.be.true;
            expect(err.message).to.eq('Value "hello" cannot be asynchronous.');
            expect(name).to.eq('hello');
        });
    });
    describe('for value-returning callbacks', () => {
        it('must return simple value as is', () => {
            const a = Flex.getSync(() => 123);
            expect(a).to.eql(123);
        });
        it('must propagate errors without onError', () => {
            expect(() => {
                Flex.getSync(() => {
                    throw 'ops';
                });
            }).to.throw('ops');
        });
        it('must redirect into onError', () => {
            let err;
            const val = Flex.getSync(() => {
                throw 'ops';
            }, {
                onError: (e) => {
                    err = e;
                    return 123;
                }
            });
            expect(err).to.eq('ops');
            expect(val).to.eq(123);
        });
        it('must pass in the context', () => {
            let context: any;
            Flex.getSync(function (this: any) {
                context = this;
            }, {cc: 123});
            expect(context).to.eq(123);
        });
    });
    describe('for promise-returning callbacks', () => {
        const errNoname = 'Value cannot be asynchronous.';
        const errNamed = 'Value "hello" cannot be asynchronous.';
        it('must throw without onError', () => {
            expect(() => {
                Flex.getSync(() => Promise.resolve(123));
            }).to.throw(errNoname);
            expect(() => {
                Flex.getSync(() => Promise.resolve(123), {name: 'hello'});
            }).to.throw(errNamed);
        });
        it('must call onError', () => {
            let err: any;
            const onError = (e: any) => {
                err = e;
            };
            Flex.getSync(() => Promise.resolve(123), {onError});
            expect(err instanceof Error).to.be.true;
            expect(err.message).to.eq(errNoname);
        });
    });
});
