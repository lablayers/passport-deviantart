var util = require('util'),
    OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

function Strategy(options, verify) {
    if(options == null) {
        options = {};
    }

    options.authorizationURL || (options.authorizationURL = 'https://www.deviantart.com/oauth2/authorize');
    options.tokenURL || (options.tokenURL = 'https://www.deviantart.com/oauth2/token');
    OAuth2Strategy.call(this, options, verify);

    this.name = 'deviantart';
    this._userProfileURL = options.userProfileURL || 'https://www.deviantart.com/api/v1/oauth2/user/whoami';
}

util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.userProfile = function(accessToken, done) {
    var _this = this;
    this._oauth2.get(this._userProfileURL, accessToken, function(err, body, res) {
        if (err) {
            done(err);
        } else {
            try {
                var json = JSON.parse(body);
                var profile = {
                    provider: _this.name,
                    id: json.userid,
                    username: json.username,
                    avatar: json.usericonurl,
                };

                profile._raw = body;
                profile._json = json;

                done(null, profile);
            } catch (_error) {
                err = _error;
                done(err);
            }
        }
    });
};

module.exports = Strategy;
