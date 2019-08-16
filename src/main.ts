import {FlexFunc, FlexValue, IFlexOptions} from './types';

export async function getValue<T>(value: FlexValue<T>, options?: IFlexOptions<T>): Promise<T> {
    const onError = options && typeof options.onError === 'function' ? options.onError : null;
    const cc = options && options.cc;
    const v = <Promise<T>>value;
    if (v && typeof v.catch === 'function') {
        if (onError) {
            return await v.catch<T>(err => <T>onError(err));
        }
        return v;
    }
    if (typeof value !== 'function') {
        return value;
    }
    if (!onError) {
        return (<FlexFunc<T>>value).call(cc);
    }
    try {
        const p = <Promise<T>>(<FlexFunc<T>>value).call(cc);
        if (p && typeof p.catch === 'function') {
            return await p.catch<T>(err => <T>onError(err));
        }
        return p;
    } catch (e) {
        return <T>onError(e);
    }
}
