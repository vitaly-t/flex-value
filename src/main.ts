export type FlexFunc<T> = (() => T) | (() => Promise<T>);

export type FlexValue<T> = T | FlexFunc<T>;

export interface FlexOptions<T> {
    onError: (err: any) => never | PromiseLike<T>
}

export async function flexValue<T>(value: FlexValue<T>, options?: FlexOptions<T>): Promise<T | undefined> {
    if (typeof value === 'function') {
        let onError: null | ((err: any) => any) = null;
        if (options && typeof options.onError === 'function') {
            onError = options.onError;
        }
        try {
            const v = (<FlexFunc<T>>value)();
            const p = <Promise<T>>v;
            if (p && typeof p.catch === 'function') {
                if (onError) {
                    return await p.catch<T>(onError);
                } else {
                    return p;
                }
            }
            return v;
        } catch (e) {
            if (onError) {
                onError(e);
            } else {
                throw e;
            }
        }
    } else {
        return value;
    }
}
