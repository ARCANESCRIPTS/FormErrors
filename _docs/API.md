# API

This is all the methods you can call after you've initiated your errors class.

## Table of Contents

  * [getMessages](#getMessages)
  * [setMessages](#setMessages)
  * [getFormat](#getFormat)
  * [setFormat](#setFormat)
  * [add](#add)
  * [merge](#merge)
  * [keys](#keys)
  * [has](#has)
  * [hasAny](#hasAny)
  * [first](#first)
  * [get](#get)
  * [all](#all)
  * [reset](#reset)
  * [any](#any)
  * [isEmpty](#isEmpty)
  * [count](#count)

### getMessages()

```js
/**
 * Get the raw messages.
 *
 * @return {any}
 */
getMessages(): any;
```

### setMessages(messages)

```js
/**
 * Set the raw messages.
 *
 * @param  {any}  messages
 */
setMessages(messages: any): void;
```

### getFormat()

```js
/**
 * Get the default message format.
 *
 * @return {string}
 */
getFormat(): string;
```

### setFormat(format)

```js
/**
 * Set the default message format.
 *
 * @param  {string}  format
 */
setFormat(format: string): void;
```

### add(key, message)

```js
/**
 * Add a message to the collection.
 *
 * @param  {string}  key
 * @param  {string}  message
 *
 * @return void
 */
add(key: string, message: string): void;
```

### merge(messages)

```js
/**
 * Merge a new array of messages into the collection.
 *
 * @param  {any}  messages
 *
 * @return {void}
 */
merge(messages: any): void;
```

### keys()

```js
/**
 * Get the keys present in the message bag.
 *
 * @return {string[]}
 */
keys(): string[];
```

### has(key)

```js
/**
 * Determine if messages exist for all of the given keys.
 *
 * @param  {string|string[]}  key
 *
 * @return {boolean}
 */
has(key?: string|string[]): boolean;
```

### hasAny(key)

```js
/**
 * Determine if messages exist for any of the given keys.
 *
 * @param  {string[]}  keys
 *
 * @return {boolean}
 */
hasAny(keys: string[]): boolean;
```

### first(key, format)

```js
/**
 * Get the first message from the bag for a given key.
 *
 * @param  {string}       key
 * @param  {string|null}  format
 *
 * @return {string}
 */
first(key: string, format?: string): string;
```

### get(key, format)

```js
/**
 * Get all of the messages from the bag for a given key.
 *
 * @param  {string}  key
 * @param  {string}  format
 *
 * @return {any}
 */
get(key: string, format?: string): any[];
```

### all(format)

```js
/**
 * Get all of the messages for every key in the bag.
 *
 * @param  {string|null}  format
 *
 * @return {any}
 */
all(format?: string): any;
```

### reset()

```js
/**
 * Reset all the validation messages.
 */
reset(): void;
```

### any()

```js
/**
 * Determine if the message bag has any messages.
 *
 * @return bool
 */
any(): boolean;
```

### isEmpty()

```js
/**
 * Determine if the message bag has any messages.
 *
 * @return {bool}
 */
isEmpty(): boolean;
```

### count()

```js
/**
 * Get the number of messages.
 *
 * @return {number}
 */
count(): number;
```
