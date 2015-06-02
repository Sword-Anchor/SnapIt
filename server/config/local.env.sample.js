'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'snapit-secret',

  FACEBOOK_ID:      '914820991913946',
  FACEBOOK_SECRET:  'efced9942eb49f5bd5064c5b1b57d356',

  TWITTER_ID:       'aJXH1rBZ9MShuskTCvqtXOyW5',
  TWITTER_SECRET:   'rxgcSqOhWOCDKGjmXiNGTMUevzxYe7HMtD025aThbMeJJ4CgMI',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
