# Examples

## Laravel + Vue.js + Axios

We're going to start by setting the routes for our "login" feature:

```php
Route::get('form', function () {
    return view('form');
});

Route::post('form', function (\Illuminate\Http\Request $request) {
    $validator = validator($data = $request->all(), [
        'email'    => 'required|string|email',
        'password' => 'required|string|min:8|max:20',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'messages' => $validator->messages(),
        ], 400);
    }

    // Login logic here
    
    return response()->json([
        'message' => 'You are logged in !',
    ]);
});
```

Now we're going to create our `Vue.js` component to handle the login form:

```vue
<script>
    import FormErrors from 'laravel-form-errors';

    export default {
        name: 'form-example',

        data() {
            return {
                email: '',
                password: '',
                errors: null
            }
        },

        created() {
            this.errors = new FormErrors;
        },

        methods: {
            sendForm() {
                this.errors.reset();

                let formData = {
                    email: this.email,
                    password: this.password
                };

                axios.post('form', formData)
                     .then(function (response) {
                        alert(response.data.message);
                        // Redirect or do something
                     })
                     .catch(function (error) {
                        if (error.response && error.response.status === 400) {
                            this.errors.setMessages(error.response.data.messages);
                        }
                     }.bind(this));
            }
        }
    }
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-default" style="margin-top: 50px;">
                    <div class="panel-heading">Login</div>
                    <div class="panel-body">
                        <form @submit.prevent="sendForm">
                            <div class="form-group" :class="{ 'has-error': errors.has('email') }">
                                <label for="email">Email address</label>
                                <input v-model="email" type="email" class="form-control" name="email" placeholder="Email">
                                <span class="help-block">{{ errors.first('email') }}</span>
                            </div>
                            <div class="form-group" :class="{ 'has-error': errors.has('password') }">
                                <label for="password">Password</label>
                                <input v-model="password" type="password" class="form-control" name="password" placeholder="Password">
                                <span class="help-block">{{ errors.first('password') }}</span>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-default">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
```

The next step, register your you component to your main app:

```js
//...

import FormExample from './FormExample';

const app = new Vue({
    el: '#app',

    components: {
        FormExample
    }

});
```

The last step to do is use the component in your blade view:

```blade
<div id="app">
    <form-example></form-example>
</div>
```

ENJOY :+1: !!

 > **Note:** You can use the mixins to use the package on multiple components, check the [Vue.js - Mixins](https://vuejs.org/guide/mixins.html).
