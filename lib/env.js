var defaults = {
  "DB_NAME": "bellbird",
  "DB_HOST": "localhost",
  "DB_PORT": 5432,
  "DB_SSL": false,
  "DB_USERNAME": "",
  "DB_PASSWORD": ""
};

module.exports = function(key) {
  return defaults[key] || process.env[key];
};
