export type FlexFunc<T> = (() => T | Promise<T>);

export type FlexValue<T> = T | FlexFunc<T>;

export interface FlexOptions<T> {
    /**
     * Optional error handler, which can also a value
     * to be used in case of an error.
     */
    onError?: (err: any) => T | undefined

    /**
     * Calling Context in case of a function.
     */
    cc?: any
}

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
