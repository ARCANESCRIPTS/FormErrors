
interface FormErrorsInterface {
    // Getters & Setters //

    /**
     * Get the raw messages.
     *
     * @return {any}
     */
    getMessages(): any;

    /**
     * Set the raw messages.
     *
     * @param  {any}  messages
     */
    setMessages(messages: any): void;

    /**
     * Get the default message format.
     *
     * @return {string}
     */
    getFormat(): string;

    /**
     * Set the default message format.
     *
     * @param  {string}  format
     */
    setFormat(format: string): void;

    // Main Methods //

    /**
     * Add a message to the collection.
     *
     * @param  {string}  key
     * @param  {string}  message
     *
     * @return void
     */
    add(key: string, message: string): void;

    /**
     * Merge a new array of messages into the collection.
     *
     * @param  {any}  messages
     *
     * @return {void}
     */
    merge(messages: any): void;

    /**
     * Get the keys present in the message bag.
     *
     * @return {string[]}
     */
    keys(): string[];

    /**
     * Determine if messages exist for all of the given keys.
     *
     * @param  {string|string[]}  key
     *
     * @return {boolean}
     */
    has(key?: string|string[]): boolean;

    /**
     * Determine if messages exist for any of the given keys.
     *
     * @param  {string[]}  keys
     *
     * @return {boolean}
     */
    hasAny(keys: string[]): boolean;

    /**
     * Get the first message from the bag for a given key.
     *
     * @param  {string}       key
     * @param  {string|null}  format
     *
     * @return {string}
     */
    first(key: string, format?: string): string;

    /**
     * Get all of the messages from the bag for a given key.
     *
     * @param  {string}  key
     * @param  {string}  format
     *
     * @return {any}
     */
    get(key: string, format?: string): any[];

    /**
     * Get all of the messages for every key in the bag.
     *
     * @param  {string|null}  format
     *
     * @return {any}
     */
    all(format?: string): any;

    /**
     * Reset all the validation messages.
     */
    reset(): void;

    /**
     * Determine if the message bag has any messages.
     *
     * @return bool
     */
    any(): boolean;

    /**
     * Determine if the message bag has any messages.
     *
     * @return {bool}
     */
    isEmpty(): boolean;

    /**
     * Get the number of messages.
     *
     * @return {number}
     */
    count(): number;
}

export default FormErrorsInterface;
