# API

This is all the methods you can call after you've initiated your errors class.

## Table of Contents

  * [getMessages](#getmessages)
  * [setMessages](#setmessages)
  * [getFormat](#getformat)
  * [setFormat](#setformat)
  * [add](#add)
  * [merge](#merge)
  * [keys](#keys)
  * [has](#has)
  * [hasAny](#hasany)
  * [first](#first)
  * [get](#get)
  * [all](#all)
  * [reset](#reset)
  * [any](#any)
  * [isEmpty](#isempty)
  * [count](#count)

### getMessages

```js
/**
 * Get the raw messages.
 *
 * @return {any}
 */
getMessages(): any;
```

### setMessages

```js
/**
 * Set the raw messages.
 *
 * @param  {any}  messages
 */
setMessages(messages: any): void;
```

### getFormat

```js
/**
 * Get the default message format.
 *
 * @return {string}
 */
getFormat(): string;
```

### setFormat

```js
/**
 * Set the default message format.
 *
 * @param  {string}  format
 */
setFormat(format: string): void;
```

### add

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

### merge

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

### keys

```js
/**
 * Get the keys present in the message bag.
 *
 * @return {string[]}
 */
keys(): string[];
```

### has

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

### hasAny

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

### first

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

### get

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

### all

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

### reset

```js
/**
 * Reset all the validation messages.
 */
reset(): void;
```

### any

```js
/**
 * Determine if the message bag has any messages.
 *
 * @return bool
 */
any(): boolean;
```

### isEmpty

```js
/**
 * Determine if the message bag has any messages.
 *
 * @return {bool}
 */
isEmpty(): boolean;
```

### count

```js
/**
 * Get the number of messages.
 *
 * @return {number}
 */
count(): number;
```
