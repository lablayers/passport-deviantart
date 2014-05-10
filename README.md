# deviantART Passport Strategy

It currently passes back passport's universal `id`, `username`, and `avatar` values.

`symbol` has been deprecated in v0.0.4.

Installation
----

```javascript
npm install passport-deviantart
```

Configuration
----

Use the following example implementation to get started with deviantART's passport strategy library:

```javascript
var passport = require('passport'),
  deviantART = require('passport-deviantart').Strategy

passport.use('deviantart', new deviantART({
    clientID: 'YOUR_APPLICATION_ID',
    clientSecret: 'YOUR_APPLICATION_SECRET',
    callbackURL: 'YOUR_CALLBACK_URL'
  },
  function(token, tokenSecret, profile, done){
    User.findOrCreate(..., function(err, user) {
      done(err, user);
    });
  }
));
```

Routes
----

Two routes are required for the deviantART passport strategy

```javascript
/* 
* This first route redirects the user to the service provider. 
*/
app.get('/auth/provider/deviantart', passport.authenticate('deviantart'));

/**
* This next route is used for the callback from the provider
* If the authentication was a sucess then reditect the user
* If it has failed bring them to the login page
**/
app.get('/auth/provider/deviantart/callback', 
  passport.authenticate('provider', { successRedirect: '/',
                                      failureRedirect: '/login' }));
```

Links
----
A simple example link to use this provider
```html
<a href="/auth/provider/deviantart">Log In with deviantART!</a>
```
