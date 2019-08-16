export type FlexFunc<T> = () => T | Promise<T>;
export type FlexValue<T> = T | Promise<T> | FlexFunc<T>;
export type FlexValueSync<T> = T | (() => T);

export interface IFlexOptions<T> {
    /**
     * Optional error handler, which can also return a value
     * to be used in case of an error.
     */
    onError?: (err: any, name?: string) => T | void;

    /**
     * Calling Context in case of a function.
     */
    cc?: any;

    /**
     * Value name to be passed into onError.
     */
    name?: string;
}
