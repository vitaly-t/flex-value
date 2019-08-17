# flex-value

[![Build Status](https://travis-ci.org/vitaly-t/flex-value.svg?branch=master)](https://travis-ci.org/vitaly-t/flex-value)
[![Coverage Status](https://coveralls.io/repos/vitaly-t/flex-value/badge.svg?branch=master)](https://coveralls.io/r/vitaly-t/flex-value?branch=master)

Strongly-typed value-resolution handler:

* From a direct value
* From value as a promise
* From a callback that returns the value
* From a callback that returns a promise

With support for a generic error handler.

## Install

```sh
npm i flex-value
```
## Usage

```ts
import {Flex, FlexValue} from 'flex-value';

interface IResult {
    msg: string;
    val: number;
}

interface ISomeInput {
    msg: FlexValue<string>;
    val: FlexValue<number>;
}

// FlexValue allows value to be any of the following:
// - direct value
// - value as a promise
// - callback that returns the value
// - callback that returns a promise
async function setValues(i: ISomeInput): Promise<IResult> {
    return {
        msg: await Flex.get(i.msg),
        val: await Flex.get(i.val)
    };
}
```

And we can handle all types of errors in a generic way:

```ts
async function setValues(i: ISomeInput): Promise<IResult> {
    const onError = e => {
        // any callback throwing or promise rejecting ends up here
        console.log(e);
    };
    return {
        msg: await Flex.get(i.msg, {onError}),
        val: await Flex.get(i.val, {onError})
    };
}
```

See more in the [Examples].

[Examples]:https://github.com/vitaly-t/flex-value/wiki/Examples
