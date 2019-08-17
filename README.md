# flex-value

[![Build Status](https://travis-ci.org/vitaly-t/flex-value.svg?branch=master)](https://travis-ci.org/vitaly-t/flex-value)
[![Coverage Status](https://coveralls.io/repos/vitaly-t/flex-value/badge.svg?branch=master)](https://coveralls.io/r/vitaly-t/flex-value?branch=master)

Strongly-typed, value-resolution handler:

* From a direct value
* From value as a promise
* From a callback that returns the value
* From a callback that returns a promise

With support for generic error handling.

See [Wiki] for documentation.

## Install

```sh
npm i flex-value
```

## Usage

```ts
import {Flex, FlexValue} from 'flex-value';

// fully-dynamic input:
const input: FlexValue<string>; // string | Promise<string> | (() => string | Promise<string>) 

// strongly-typed, actual value resolution:
const value: string = await Flex.get(input); 
```

And we can handle all types of errors in a generic way:

```ts
const onError = e => {
    // any error thrown or promise reject ends up here;
};

const value: string = await Flex.get(input, {onError});
```

See more in the [Examples].

[Wiki]:https://github.com/vitaly-t/flex-value/wiki
[Examples]:https://github.com/vitaly-t/flex-value/wiki/Examples
