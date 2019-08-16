# flex-value

[![Build Status](https://travis-ci.org/vitaly-t/flex-value.svg?branch=master)](https://travis-ci.org/vitaly-t/flex-value)
[![Coverage Status](https://coveralls.io/repos/vitaly-t/flex-value/badge.svg?branch=master)](https://coveralls.io/r/vitaly-t/flex-value?branch=master)

Strongly-typed value-resolution handler:

* From a direct value
* From value as a promise
* From a callback that returns the value
* From a callback that returns a promise

With support of a generic error handler.

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

// By using type FlexValue, we allow each value to be any of:
// - direct value
// - value as promise
// - callback that returns the value
// - callback that returns a promise
function async setValues(i: {msg: FlexValue<string>, val: FlexValue<number>}): IResult {
    return {
        msg: await Flex.get<string>(i.msg),
        val: await Flex.get<number>(i.val)
    };
}
```
