import FormErrors from '../dist/FormErrors';

const messages = {
    'name': [
        'The Name field is required.'
    ],
    'age': [
        'The Age must be an integer.',
        'The Age must be at least 100 years old.'
    ],
    'numbers.0': [
        'The numbers.0 is required.',
        'The numbers.0 must be an integer.'
    ],
    'numbers.5': [
        "The numbers.5 must be an integer."
    ]
};

describe('#getMessages() & #setMessage()', () => {
    it('Can get and set validation messages', () => {
        let errors = new FormErrors;

        expect(errors.getMessages()).toEqual({});

        errors.setMessages(messages);

        expect(errors.getMessages()).toEqual(messages);
    });
});

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

    it('Can check has validation messages for an array input', () => {
        let errors = new FormErrors(messages);

        expect(errors.has('numbers.*')).toBe(true);
        expect(errors.has('numbers.0')).toBe(true);
        expect(errors.has('numbers.5')).toBe(true);

        expect(errors.has('numbers.1')).toBe(false);
        expect(errors.has('numbers.6')).toBe(false);
        expect(errors.has('numbers.one')).toBe(false);
        expect(errors.has('emails.*')).toBe(false);
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

    it('Can get first validation message with wildcards', () => {
        let errors = new FormErrors(messages);

        expect(errors.first('numbers.*')).toEqual('The numbers.0 is required.');
        expect(errors.first('numbers.0')).toEqual('The numbers.0 is required.');
        expect(errors.first('numbers.5')).toEqual('The numbers.5 must be an integer.');

        expect(errors.first('numbers.1')).toEqual('');
        expect(errors.first('numbers.6')).toEqual('');
    });

    it('Can get first validation message with wildcards + format', () => {
        let errors = new FormErrors(messages);

        let format = '<span class="label label-danger">:message</span>'

        expect(errors.first('numbers.*', format)).toEqual('<span class="label label-danger">The numbers.0 is required.</span>');
        expect(errors.first('numbers.0', format)).toEqual('<span class="label label-danger">The numbers.0 is required.</span>');
        expect(errors.first('numbers.5', format)).toEqual('<span class="label label-danger">The numbers.5 must be an integer.</span>');

        expect(errors.first('numbers.1', format)).toEqual('');
        expect(errors.first('numbers.6', format)).toEqual('');

        format = ':key => :message'

        expect(errors.first('numbers.*', format)).toEqual('numbers.0 => The numbers.0 is required.');
        expect(errors.first('numbers.0', format)).toEqual('numbers.0 => The numbers.0 is required.');
        expect(errors.first('numbers.5', format)).toEqual('numbers.5 => The numbers.5 must be an integer.');

        expect(errors.first('numbers.1', format)).toEqual('');
        expect(errors.first('numbers.6', format)).toEqual('');
    });
});

describe('#get()', () => {
    it('Can get all the validation messages for the given key', () => {
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

    it('Can get all the validation messages for the given key with format', () => {
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

    it('Can get all the validation messages with wildcards', () => {
        let errors = new FormErrors(messages);

        expect(errors.get('numbers.*')).toEqual({
            'numbers.0': [
                'The numbers.0 is required.',
                'The numbers.0 must be an integer.'
            ],
            'numbers.5': [
                'The numbers.5 must be an integer.'
            ]
        });
        expect(errors.get('numbers.0')).toEqual([
            'The numbers.0 is required.',
            'The numbers.0 must be an integer.'
        ]);
        expect(errors.get('numbers.5')).toEqual([
            'The numbers.5 must be an integer.'
        ]);

        expect(errors.get('numbers.1')).toEqual([]);
        expect(errors.get('numbers.6')).toEqual([]);
    });

    it('Can get first validation message with wildcards + format', () => {
        let errors = new FormErrors(messages);

        let format = '<span class="label label-danger">:message</span>'

        expect(errors.get('numbers.*', format)).toEqual({
            'numbers.0': [
                '<span class="label label-danger">The numbers.0 is required.</span>',
                '<span class="label label-danger">The numbers.0 must be an integer.</span>'
            ],
            'numbers.5': [
                '<span class="label label-danger">The numbers.5 must be an integer.</span>'
            ]
        });
        expect(errors.get('numbers.0', format)).toEqual([
            '<span class="label label-danger">The numbers.0 is required.</span>',
            '<span class="label label-danger">The numbers.0 must be an integer.</span>'
        ]);
        expect(errors.get('numbers.5', format)).toEqual([
            '<span class="label label-danger">The numbers.5 must be an integer.</span>'
        ]);

        expect(errors.get('numbers.1', format)).toEqual([]);
        expect(errors.get('numbers.6', format)).toEqual([]);

        format = ':key => :message'

        expect(errors.get('numbers.*', format)).toEqual({
            'numbers.0': [
                'numbers.0 => The numbers.0 is required.',
                'numbers.0 => The numbers.0 must be an integer.'
            ],
            'numbers.5': [
                'numbers.5 => The numbers.5 must be an integer.'
            ]
        });
        expect(errors.get('numbers.0', format)).toEqual([
            'numbers.0 => The numbers.0 is required.',
            'numbers.0 => The numbers.0 must be an integer.'
        ]);
        expect(errors.get('numbers.5', format)).toEqual([
            'numbers.5 => The numbers.5 must be an integer.'
        ]);

        expect(errors.get('numbers.1', format)).toEqual([]);
        expect(errors.get('numbers.6', format)).toEqual([]);
    });
});

describe('#all()', () => {
    it('Can get all the validation messages', () => {
        let errors = new FormErrors({});

        expect(errors.all()).toEqual({});

        errors = new FormErrors(messages);

        expect(errors.all()).toEqual({
            'name': [
                'The Name field is required.'
            ],
            'age': [
                'The Age must be an integer.',
                'The Age must be at least 100 years old.'
            ],
            'numbers.0': [
                'The numbers.0 is required.',
                'The numbers.0 must be an integer.'],
            'numbers.5': [
                'The numbers.5 must be an integer.'
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
            'age': [
                '<span class="label label-danger">The Age must be an integer.</span>',
                '<span class="label label-danger">The Age must be at least 100 years old.</span>'
            ],
            'numbers.0': [
                '<span class="label label-danger">The numbers.0 is required.</span>',
                '<span class="label label-danger">The numbers.0 must be an integer.</span>'
            ],
            'numbers.5': [
                '<span class="label label-danger">The numbers.5 must be an integer.</span>'
            ]
        });

        // Format with :message & :key
        format = ':key => :message';

        expect(errors.all(format)).toEqual({
            'name': [
                'name => The Name field is required.'
            ],
            'age': [
                'age => The Age must be an integer.',
                'age => The Age must be at least 100 years old.'
            ],
            'numbers.0': [
                'numbers.0 => The numbers.0 is required.',
                'numbers.0 => The numbers.0 must be an integer.'
            ],
            'numbers.5': [
                'numbers.5 => The numbers.5 must be an integer.'
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
            'name': [
                'The Name field is required.'
            ]
        });

        expect(errors.count()).toEqual(1);
        expect(errors.has('name')).toBe(true);
        expect(errors.get('name')).toEqual([
            'The Name field is required.'
        ]);

        errors.merge({
            'name': [
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

        expect(errors.count()).toBe(4);
    });
});

describe('#merge()', () => {
    it('Can merge messages with a custom one', () => {
        let errors = new FormErrors(messages);

        expect(errors.count()).toEqual(4);
        expect(errors.has('email')).toBe(false);
        expect(errors.get('email')).toEqual([]);

        errors.merge({
            'email': [
                'The Email field is required.',
                'The Email field must be a valid email.'
            ]
        });

        expect(errors.count()).toEqual(5);
        expect(errors.has('email')).toBe(true);
        expect(errors.get('email')).toEqual([
            'The Email field is required.',
            'The Email field must be a valid email.'
        ]);
    });

    it('Can merge messages with override', () => {
        let errors = new FormErrors;

        expect(errors.count()).toEqual(0);
        expect(errors.has('name')).toBe(false);
        expect(errors.get('name')).toEqual([]);

        errors.merge({
            'name': [
                'The Name field is required.'
            ]
        });

        expect(errors.count()).toEqual(1);
        expect(errors.has('name')).toBe(true);
        expect(errors.get('name')).toEqual([
            'The Name field is required.'
        ]);

        errors.merge({
            'name': [
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

describe('#reset()', () => {
    it('Can reset all the validation messages', () => {
        let errors = new FormErrors;

        errors.setMessages(messages);

        expect(errors.isEmpty()).toBe(false);

        errors.reset();

        expect(errors.isEmpty()).toBe(true);
    });
});

describe('#add()', () => {
    it('Can add message to the collection', () => {
        let errors = new FormErrors;

        expect(errors.count()).toEqual(0);

        errors.add('name', 'The name is required.');

        expect(errors.count()).toEqual(1);

        errors.add('name', 'The name must be an alpha-numeric.');

        expect(errors.count()).toEqual(1);

        errors.add('email', 'The email is required.');

        expect(errors.count()).toEqual(2);

        expect(errors.getMessages()).toEqual({
            'email': [
                'The email is required.'
            ],
            'name': [
                'The name is required.',
                'The name must be an alpha-numeric.'
            ]
        });
    });

    it('Can only add unique messages to the collection', () => {
        let errors = new FormErrors;

        expect(errors.count()).toEqual(0);

        errors.add('name', 'The name is required.');

        expect(errors.count()).toEqual(1);

        errors.add('name', 'The name must be an alpha-numeric.');

        expect(errors.count()).toEqual(1);

        errors.add('name', 'The name is required.');

        expect(errors.count()).toEqual(1);

        errors.add('name', 'The name must be an alpha-numeric.');

        expect(errors.getMessages()).toEqual({
            'name': [
                'The name is required.',
                'The name must be an alpha-numeric.'
            ]
        });
    });
});
