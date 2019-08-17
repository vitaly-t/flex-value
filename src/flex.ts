import {FlexFunc, FlexValue, FlexValueSync, IFlexOptions} from './types';

export class Flex {

    /**
     * Handles both synchronous and asynchronous values.
     */
    static async get<T>(value: FlexValue<T>, options?: IFlexOptions<T>): Promise<T> {
        const onError = options && typeof options.onError === 'function' ? options.onError : null;
        const name = options && typeof options.name === 'string' ? options.name : undefined;
        const cc = options && options.cc;

        const p = <Promise<T>>value;
        if (p && typeof p.catch === 'function') {
            if (onError) {
                return p.catch<T>(err => <T>onError(err, name));
            }
            return p;
        }
        if (typeof value !== 'function') {
            return value;
        }
        if (!onError) {
            return (<FlexFunc<T>>value).call(cc);
        }
        try {
            const v = <Promise<T>>(<FlexFunc<T>>value).call(cc);
            if (v && typeof v.catch === 'function') {
                // tslint is buggy here: https://github.com/palantir/tslint/issues/4824
                return v.catch(err => <T>onError(err, name));
            }
            return v;
        } catch (e) {
            return <T>onError(e, name);
        }
    }

    /**
     * Handles synchronous values, and throws on asynchronous ones.
     */
    static getSync<T>(value: FlexValueSync<T>, options?: IFlexOptions<T>): T {
        const onError = options && typeof options.onError === 'function' ? options.onError : null;
        const name = options && typeof options.name === 'string' ? options.name : undefined;
        const cc = options && options.cc;
        const checkAsync = (v: any): T => {
            if (v && typeof v.then === 'function') {
                const err = new Error(`Value ${name ? '"' + name + '" ' : ''}cannot be asynchronous.`);
                if (onError) {
                    return <T>onError(err, name);
                }
                throw err;
            }
            return v;
        };
        if (typeof value !== 'function') {
            return checkAsync(value);
        }
        const getValue = () => (<() => T>value).call(cc);
        if (!onError) {
            return checkAsync(getValue());
        }
        let v;
        try {
            v = getValue();
        } catch (e) {
            return <T>onError(e, name);
        }
        return checkAsync(v);
    }

}
