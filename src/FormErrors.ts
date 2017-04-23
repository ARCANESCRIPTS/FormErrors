///<reference path="../typings/modules/lodash/index.d.ts"/>
import _ from 'lodash';
import FormErrorsInterface from './FormErrorsInterface';

class FormErrors implements FormErrorsInterface {
    // Properties //

    protected messages:any  = {};
    protected format:string = ':message';

    // Constructor //

    /**
     * Instantiate the FormErrors.
     *
     * @param  {any}  messages
     */
    public constructor(messages: any = {}) {
        this.messages = messages;
    }

    // Getters & Setters //

    /**
     * Get the raw messages.
     *
     * @returns {any}
     */
    public getMessages(): any {
        return this.messages;
    }

    /**
     * Get the default message format.
     *
     * @return {string}
     */
    public getFormat(): string {
        return this.format;
    }

    /**
     * Set the default message format.
     *
     * @param  {string}  format
     */
    public setFormat(format:string): void {
        this.format = format;
    }

    // Main Method //

    /**
     * Merge a new array of messages into the collection.
     *
     * @param  {any}  messages
     *
     * @return {void}
     */
    public merge(messages: any): void {
        this.messages = _.mergeWith(this.messages, messages);
    }

    /**
     * Get the keys present in the message bag.
     *
     * @return {string[]}
     */
    public keys(): string[] {
        return Object.keys(this.getMessages());
    }

    /**
     * Determine if messages exist for all of the given keys.
     *
     * @param  {string|string[]}  key
     *
     * @returns {boolean}
     */
    public has(key?: string|string[]): boolean {
        if (key) {
            return _.isArray(key)
                ? _.difference(this.keys(), key).length === 0
                : _.has(this.getMessages(), key);
        }

        return this.any();
    }

    /**
     * Determine if messages exist for any of the given keys.
     *
     * @param  {string[]}  keys
     *
     * @return {boolean}
     */
    public hasAny(keys: string[]): boolean {
        for(let index in keys) {
            if (this.has(keys[index])) return true;
        }

        return false;
    }

    /**
     * Get the first message from the bag for a given key.
     *
     * @param  {string}       key
     * @param  {string|null}  format
     *
     * @return {string}
     */
    public first(key: string, format?: string): string {
        return this.has(key) ? _.head(this.get(key, format)) : '';
    }

    /**
     * Get all of the messages from the bag for a given key.
     *
     * @param  {string}  key
     * @param  {string}  format
     *
     * @returns {any}
     */
    public get(key: string, format?: string): any {
        if ( ! this.has(key)) return [];

        let messages = _.get(this.getMessages(), key, []);

        return this.transform(messages, this.checkFormat(format), key);
    }

    /**
     * Get all errors.
     *
     * @param  {string|null}  format
     *
     * @return {any}
     */
    public all(format?: string): any {
        let all = {};

        if (this.any()) {
            format = this.checkFormat(format);

            _.forEach(this.keys(), (key) => {
                all[key] = this.get(key, format);
            });
        }

        return all;
    }

    /**
     * Determine if the message bag has any messages.
     *
     * @return {boolean}
     */
    public any(): boolean {
        return this.count() > 0;
    }

    /**
     * Determine if the message bag has any messages.
     *
     * @return {bool}
     */
    public isEmpty(): boolean {
        return ! this.any();
    }

    /**
     * Get the number of messages.
     *
     * @returns {number}
     */
    public count(): number {
        return this.keys().length;
    }

    // Other Methods //

    /**
     * Get the appropriate format based on the given format.
     *
     * @param  {string}  format
     *
     * @return {string}
     */
    private checkFormat(format: string): string {
        return format || this.format;
    }

    /**
     * Format an array of messages.
     *
     * @param  {string[]}  messages
     * @param  {string}    format
     * @param  {string}    key
     *
     * @returns {string[]}
     */
    private transform(messages, format, key) {
        return _.transform(messages, function(result, message) {
            result.push(
                format.replace(new RegExp(':message', 'g'), message)
                      .replace(new RegExp(':key', 'g'), key)
            );
        })
    }
}

export { FormErrors as default};
