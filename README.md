# FormErrors [![License][badge_license]][link_license] [![NPM][badge_npm]][link_npm]

[![Travis Build][badge_build]][link_build]
[![Codacy grade][badge_grade]][link_grade]
[![Code Coverage][badge_coverage]][link_coverage]
[![Latest Release][badge_release]][link_npm]
[![Downloads][badge_downloads]][link_npm]
[![GitHub issues][badge_issues]][link_issues]

*By [ARCANEDEV&copy;](http://www.arcanedev.net/)*

An error helper inspired from Laravel's `Illuminate\Support\MessageBag` that allows you to handle the validation messages.

Feel free to check out the [releases][link_releases], [license][link_license], and [contribution guidelines][link_contributing].

## Installation

> Coming soon...

## Usage

> Coming soon...

### API

```js
/**
 * Get the raw messages.
 *
 * @return {any}
 */
getMessages(): any;
```

```js
/**
 * Set the raw messages.
 *
 * @param  {any}  messages
 */
setMessages(messages: any): void;
```

```js
/**
 * Get the default message format.
 *
 * @return {string}
 */
getFormat(): string;
```

```js
/**
 * Set the default message format.
 *
 * @param  {string}  format
 */
setFormat(format:string): void;
```

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

```js
/**
 * Get the keys present in the message bag.
 *
 * @return {string[]}
 */
keys(): string[];
```

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

```js
/**
 * Reset all the validation messages.
 */
reset(): void;
```

```js
/**
 * Determine if the message bag has any messages.
 *
 * @return bool
 */
any(): boolean;
```

```js
/**
 * Determine if the message bag has any messages.
 *
 * @return {bool}
 */
isEmpty(): boolean;
```

```js
/**
 * Get the number of messages.
 *
 * @return {number}
 */
count(): number;
```

## Contribution

Any ideas are welcome. Feel free to submit any issues or pull requests, please check the [contribution guidelines][link_contributing].

## Security

If you discover any security related issues, please email arcanedev.maroc@gmail.com instead of using the issue tracker.

## Credits

- [ARCANEDEV][link_author]
- [All Contributors][link_contributors]

[link_license]:      https://github.com/ARCANESCRIPTS/FormErrors/blob/master/LICENSE.md
[link_build]:        https://travis-ci.org/ARCANESCRIPTS/FormErrors
[link_grade]:        https://www.codacy.com/app/ARCANESCRIPTS/FormErrors
[link_coverage]:     https://www.codacy.com/app/ARCANESCRIPTS/FormErrors
[link_npm]:          https://www.npmjs.com/package/laravel-form-errors
[link_issues]:       https://github.com/ARCANESCRIPTS/FormErrors/issues
[link_author]:       https://github.com/arcanedev-maroc
[link_contributors]: https://github.com/ARCANESCRIPTS/FormErrors/graphs/contributors
[link_releases]:     https://github.com/ARCANESCRIPTS/FormErrors/releases
[link_contributing]: https://github.com/ARCANESCRIPTS/FormErrors/blob/master/CONTRIBUTING.md

[badge_license]:   https://img.shields.io/npm/l/laravel-form-errors.svg?style=flat-square
[badge_build]:     https://img.shields.io/travis/ARCANESCRIPTS/FormErrors/master.svg?style=flat-square
[badge_grade]:     https://img.shields.io/codacy/grade/1f8cfab7d8d149e3b3d4f278e34d8e7d.svg?style=flat-square
[badge_coverage]:  https://img.shields.io/codacy/coverage/1f8cfab7d8d149e3b3d4f278e34d8e7d/master.svg?style=flat-square
[badge_npm]:       https://img.shields.io/badge/npm-%E2%9C%93-brightgreen.svg?style=flat-square
[badge_release]:   https://img.shields.io/npm/v/laravel-form-errors.svg?style=flat-square
[badge_downloads]: https://img.shields.io/npm/dt/laravel-form-errors.svg?style=flat-square
[badge_issues]:    https://img.shields.io/github/issues/ARCANESCRIPTS/FormErrors.svg?style=flat-square
