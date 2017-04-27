///<reference path="../typings/modules/lodash/index.d.ts"/>
import _ from 'lodash';
import FormErrorsInterface from './FormErrorsInterface';

class FormErrors implements FormErrorsInterface {
    // Properties //

    protected messages:any = {};

    protected format:string = ':message';

    // Constructor //

    /**
     * Instantiate the FormErrors.
     *
     * @param  {any}  messages
     */
    public constructor(messages: any = {}) {
        this.setMessages(messages);
    }

    // Getters & Setters //

    /**
     * Get the raw messages.
     *
     * @return {any}
     */
    public getMessages(): any {
        return this.messages;
    }

    /**
     * Set the raw messages.
     *
     * @param  {any}  messages
     */
    public setMessages(messages: any): void {
        return this.messages = messages;
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
    public setFormat(format: string): void {
        this.format = format;
    }

    // Main Method //

    /**
     * Add a message to the collection.
     *
     * @param  {string}  key
     * @param  {string}  message
     *
     * @return void
     */
    add(key: string, message: string): void {
        if (this.isUnique(key, message)) {
            if (this.messages[key])
                this.messages[key].push(message);
            else
                this.messages[key] = [message];
        }
    }

    /**
     * Merge a new array of messages into the collection.
     *
     * @param  {any}  messages
     *
     * @return {void}
     */
    public merge(messages: any): void {
        this.setMessages(
            _.merge(this.getMessages(), messages)
        );
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
     * @return {boolean}
     */
    public has(key?: string|string[]): boolean {
        if (key) {
            let keys = _.isArray(key) ? key : [key];

            for (let index in keys) {
                if (this.first(keys[index]) === '') return false;
            }

            return true;
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
        let messages = (key) ? this.get(key, format) : this.all(format);

        let firstMessage: any;

        if (_.isObject(messages))
            firstMessage = messages[Object.keys(messages)[0]];

        return _.isString(firstMessage)
            ? firstMessage
            : (_.isArray(firstMessage) ? _.head(firstMessage) || '' : '');
    }

    /**
     * Get all of the messages from the bag for a given key.
     *
     * @param  {string}  key
     * @param  {string}  format
     *
     * @return {any}
     */
    public get(key: string, format?: string): any {
        if (_.has(this.getMessages(), key)) {
            let message = _.get(this.getMessages(), key, []);

            return this.transform(message, format, key)
        }

        return key.includes('*')
            ? this.getMessagesForWildcardKey(key, format)
            : [];
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
            _.forEach(this.keys(), (key) => {
                all[key] = this.get(key, format);
            });
        }

        return all;
    }

    /**
     * Reset all the validation messages.
     */
    public reset(): void {
        this.setMessages({});
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
     * @return {number}
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
     * @return {string[]}
     */
    private transform(messages: string[], format: string, key: string) {
        format = this.checkFormat(format);

        return _.transform(messages, function(result, message) {
            result.push(
                format.replace(new RegExp(':message', 'g'), message)
                      .replace(new RegExp(':key', 'g'), key)
            );
        });
    }

    /**
     * Get the messages for a wildcard key.
     *
     * @param  string  key
     * @param  string  format
     *
     * @return {string[]}
     */
    private getMessagesForWildcardKey(key: string, format: string) {
        let regex    = new RegExp(`^${key}$`);
        let messages = _.pickBy(this.getMessages(), function(m, k) {
            return regex.test(k);
        });

        let transformed = {};

        for (let k in messages) {
            transformed[k] = this.transform(messages[k], format, k);
        }

        return transformed;
    }

    /**
     * Determine if a key and message combination already exists.
     *
     * @param  {string}  key
     * @param  {string}  message
     *
     * @return boolean
     */
    private isUnique(key: string, message: string): boolean {
        if (this.messages[key]) {
            return ! this.messages[key].includes(message);
        }

        return true;
    }
}

export default FormErrors;
