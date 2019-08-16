import {FlexFunc, FlexOptions, FlexValue} from "./types";

export async function flexValue<T>(value: FlexValue<T>, options?: FlexOptions<T>): Promise<T> {
    if (typeof value === 'function') {
        const onError = options && typeof options.onError === 'function' ? options.onError : null;
        const cc = options && options.cc;
        if (onError) {
            try {
                const p = <Promise<T>>(<FlexFunc<T>>value).call(cc);
                if (p && typeof p.catch === 'function') {
                    return await p.catch<T>(err => {
                        return <T>onError(err);
                    });
                }
                return p;
            } catch (e) {
                return <T>onError(e);
            }
        } else {
            return (<FlexFunc<T>>value).call(cc);
        }
    } else {
        return value;
    }
}
