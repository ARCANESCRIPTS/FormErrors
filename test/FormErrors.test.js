import FormErrors from "../dist/FormErrors";

const messages = {
    "name": [
        "The Name field is required."
    ],
    "age": [
        "The Age must be an integer.",
        "The Age must be at least 100 years old."
    ]
};

describe('#getFormat() & #setFormat()', () => {
    it('Can get and set the format', () => {
        let errors = new FormErrors;

        expect(errors.getFormat()).toEqual(':message');

        errors.setFormat('<span class="label label-danger">:message</span>')

        expect(errors.getFormat()).toEqual('<span class="label label-danger">:message</span>');

        errors.setFormat(':message')
    });
});

describe('#has()', () => {
    it('Can check if it has any validation messages', () => {
        let errors = new FormErrors(messages);

        expect(errors.has()).toBe(true);

        errors = new FormErrors([]);

        expect(errors.has()).toBe(false);
    });

    it('Can check has validation messages', () => {
        let errors = new FormErrors(messages);

        expect(errors.has('name')).toBe(true);
        expect(errors.has('age')).toBe(true);

        expect(errors.has('email')).toBe(false);
    });

    it('Can check has validation messages for the given keys', () => {
        let errors = new FormErrors(messages);

        expect(errors.has(['name', 'age'])).toBe(true);
        expect(errors.has(['age', 'name'])).toBe(true);

        expect(errors.has(['name', 'email'])).toBe(false);
        expect(errors.has(['age', 'email'])).toBe(false);
        expect(errors.has(['email', 'name'])).toBe(false);
    });
});

describe('#hasAny()', () => {
    it('Can check if the validation messages has any given keys', () => {
        let errors = new FormErrors(messages);

        expect(errors.hasAny(['name'])).toBe(true);
        expect(errors.hasAny(['age'])).toBe(true);
        expect(errors.hasAny(['name', 'age'])).toBe(true);

        expect(errors.hasAny(['email'])).toBe(false);

        expect(errors.hasAny(['name', 'email'])).toBe(true);
        expect(errors.hasAny(['age', 'email'])).toBe(true);
        expect(errors.hasAny(['name', 'age', 'email'])).toBe(true);

        expect(errors.hasAny(['email', 'name'])).toBe(true);
        expect(errors.hasAny(['email', 'age'])).toBe(true);
    });
});

describe('#first()', () => {
    it('Can get first validation message', () => {
        let errors = new FormErrors(messages);

        expect(errors.first('name')).toBe('The Name field is required.');
        expect(errors.first('age')).toBe('The Age must be an integer.');
        expect(errors.first('email')).toBe('');
    });

    it('Can get first validation message with format', () => {
        let errors = new FormErrors(messages);

        // Format with :message
        let format = '<span class="label label-danger">:message</span>';

        expect(errors.first('name', format)).toBe('<span class="label label-danger">The Name field is required.</span>');
        expect(errors.first('age', format)).toBe('<span class="label label-danger">The Age must be an integer.</span>');
        expect(errors.first('email', format)).toBe('');

        // Format with :message & :key
        format = ':key => :message';

        expect(errors.first('name', format)).toBe('name => The Name field is required.');
        expect(errors.first('age', format)).toBe('age => The Age must be an integer.');
        expect(errors.first('email', format)).toBe('');
    });
});

describe('#get()', () => {
    it('Can get a all the validation messages for the given key', () => {
        let errors = new FormErrors(messages);

        expect(errors.get('name')).toEqual([
            "The Name field is required."
        ]);

        expect(errors.get('age')).toEqual([
            "The Age must be an integer.",
            "The Age must be at least 100 years old."
        ]);

        expect(errors.get('email')).toEqual([]);
    });

    it('Can get a all the validation messages for the given key with format', () => {
        let errors = new FormErrors(messages);

        // Format with :message
        let format = '<span class="label label-danger">:message</span>';

        expect(errors.get('name', format)).toEqual([
            '<span class="label label-danger">The Name field is required.</span>'
        ]);

        expect(errors.get('age', format)).toEqual([
            '<span class="label label-danger">The Age must be an integer.</span>',
            '<span class="label label-danger">The Age must be at least 100 years old.</span>'
        ]);

        expect(errors.get('email', format)).toEqual([]);

        // Format with :message & :key
        format = ':key => :message';

        expect(errors.get('name', format)).toEqual([
            'name => The Name field is required.'
        ]);

        expect(errors.get('age', format)).toEqual([
            'age => The Age must be an integer.',
            'age => The Age must be at least 100 years old.'
        ]);

        expect(errors.get('email', format)).toEqual([]);
    });
});

describe('#all()', () => {
    it('Can get all the validation messages', () => {
        let errors = new FormErrors({});

        expect(errors.all()).toEqual({});

        errors = new FormErrors(messages);

        expect(errors.all()).toEqual({
            "name": [
                'The Name field is required.'
            ],
            "age": [
                'The Age must be an integer.',
                'The Age must be at least 100 years old.'
            ]
        });
    });

    it('Can get all the validation messages with format', () => {
        let errors = new FormErrors(messages);

        // Format with :message
        let format = '<span class="label label-danger">:message</span>';

        expect(errors.all(format)).toEqual({
            "name": [
                '<span class="label label-danger">The Name field is required.</span>'
            ],
            "age": [
                '<span class="label label-danger">The Age must be an integer.</span>',
                '<span class="label label-danger">The Age must be at least 100 years old.</span>'
            ]
        });

        // Format with :message & :key
        format = ':key => :message';

        expect(errors.all(format)).toEqual({
            "name": [
                'name => The Name field is required.'
            ],
            "age": [
                'age => The Age must be an integer.',
                'age => The Age must be at least 100 years old.'
            ]
        });
    });
});

describe('#any() & #empty()', () => {
    it('Can check if the messages container is empty or not', () => {
        let errors = new FormErrors;

        expect(errors.isEmpty()).toBe(true);
        expect(errors.any()).toBe(false);

        errors = new FormErrors(messages);

        expect(errors.isEmpty()).toBe(false);
        expect(errors.any()).toBe(true);
    });

    it('Can merge messages with override', () => {
        let errors = new FormErrors;

        expect(errors.count()).toEqual(0);
        expect(errors.has('name')).toBe(false);
        expect(errors.get('name')).toEqual([]);

        errors.merge({
            "name": [
                'The Name field is required.'
            ]
        });

        expect(errors.count()).toEqual(1);
        expect(errors.has('name')).toBe(true);
        expect(errors.get('name')).toEqual([
            'The Name field is required.'
        ]);

        errors.merge({
            "name": [
                'The custom Name field is required.'
            ]
        });

        expect(errors.count()).toEqual(1);
        expect(errors.has('name')).toBe(true);
        expect(errors.get('name')).toEqual([
            'The custom Name field is required.'
        ]);
    });
});

describe('#count()', () => {
    it('Can get the messages count', () => {
        let errors = new FormErrors(messages);

        expect(errors.count()).toBe(2);
    });
});

describe('#merge()', () => {
    it('Can merge messages with a custom one', () => {
        let errors = new FormErrors(messages);

        expect(errors.count()).toEqual(2);
        expect(errors.has('email')).toBe(false);
        expect(errors.get('email')).toEqual([]);

        errors.merge({
            "email": [
                "The Email field is required.",
                "The Email field must be a valid email."
            ]
        });

        expect(errors.count()).toEqual(3);
        expect(errors.has('email')).toBe(true);
        expect(errors.get('email')).toEqual([
            "The Email field is required.",
            "The Email field must be a valid email."
        ]);
    });

    it('Can merge messages with override', () => {
        let errors = new FormErrors;

        expect(errors.count()).toEqual(0);
        expect(errors.has('name')).toBe(false);
        expect(errors.get('name')).toEqual([]);

        errors.merge({
            "name": [
                'The Name field is required.'
            ]
        });

        expect(errors.count()).toEqual(1);
        expect(errors.has('name')).toBe(true);
        expect(errors.get('name')).toEqual([
            'The Name field is required.'
        ]);

        errors.merge({
            "name": [
                'The custom Name field is required.'
            ]
        });

        expect(errors.count()).toEqual(1);
        expect(errors.has('name')).toBe(true);
        expect(errors.get('name')).toEqual([
            'The custom Name field is required.'
        ]);
    });
});
