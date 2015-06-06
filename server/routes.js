/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var auth = require('./auth/auth.service');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  app.post('/forgotpassword', require('./forgotpassword').reset);
  app.post('/invite', require('./invite').invite);
  
  app.use('/main', function(req, res, next){
    if (auth.isAuthenticated() !== true){
      res.redirect(process.env.DOMAIN + '/login')
    }
    else {
      next();
    }
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
