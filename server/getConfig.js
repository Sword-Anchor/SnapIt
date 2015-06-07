var config = require('./config/environment');

module.exports = function (req, res) {
  var configKeys = config.keys;
  var json = JSON.stringify(configKeys);
  console.log("route"+json);
  res.end(json);
};