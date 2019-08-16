import {FlexFunc, FlexValue, FlexValueSync, IFlexOptions} from './types';

export class Flex {

    static get<T>(value: FlexValue<T>, options?: IFlexOptions<T>): T | Promise<T> {
        const onError = options && typeof options.onError === 'function' ? options.onError : null;
        const cc = options && options.cc;
        const p = <Promise<T>>value;
        if (p && typeof p.catch === 'function') {
            if (onError) {
                return p.catch<T>(err => <T>onError(err));
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
                return v.catch<T>(err => <T>onError(err));
            }
            return v;
        } catch (e) {
            return <T>onError(e);
        }
    }

    static getSync<T>(value: FlexValueSync<T>, options?: IFlexOptions<T>): T {
        const onError = options && typeof options.onError === 'function' ? options.onError : null;
        const cc = options && options.cc;
        if (typeof value !== 'function') {
            return value;
        }
        if (onError) {
            try {
                return (<() => T>value).call(cc);
            } catch (e) {
                return <T>onError(e);
            }
        }
        return (<() => T>value).call(cc);
    }

}
