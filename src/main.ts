import {FlexFunc, IFlexOptions} from './types';

// TODO: Consider adding Promise-value as well
export async function flexValue<T>(value: T | FlexFunc<T>, options?: IFlexOptions<T>): Promise<T> {
    if (typeof value !== 'function') {
        return value;
    }
    const onError = options && typeof options.onError === 'function' ? options.onError : null;
    const cc = options && options.cc;
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
