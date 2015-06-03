var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function (User, config) {


  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('in callback', profile);
      User.findOne({
        'facebook.id': profile.id
      },
      function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log("no user found");
          user = new User({
            name: profile.displayName,
            email: 'thomas@gmail.com',
            role: 'user',
            username: profile.username,
            provider: 'facebook',
            facebook: profile._json
          });
          console.log("created new user, about to save");
          user.save(function(err) {
            if (err) {
              console.log(err);
              done(err);
            }
            return done(null, user);
          });
        } else {
          return done(null, user);
        }
      })
    }
  ));
  console.log("end of setup");
};