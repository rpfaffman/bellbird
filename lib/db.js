var pgp = require('pg-promise');
var env = require('./env.js');

var config = {
  host: env('DB_HOST'),
  port: Number.parseInt(env('DB_PORT'), 10),
  database: env('DB_NAME'),
  user: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  ssl: env('DB_SSL') === true
};

function Db() {
  var db = pgp()(config);

  this.migrate = function() {
    db.none(`
      CREATE TABLE IF NOT EXISTS alarms(
        id SERIAL PRIMARY KEY,
        content VARCHAR (140) NOT NULL,
        created_at TIMESTAMP DEFAULT current_timestamp
      );

      CREATE TABLE IF NOT EXISTS upvotes(
        id SERIAL PRIMARY KEY,
        alarm_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT current_timestamp
      );
    `).then(function() {
      console.log('[!!!] - successful migration');
    }).catch(function(err) {
      console.log('[!!!] - migration error', err);
    });
  };

  this.alarmsIndex = function() {
    return db.any(`
      SELECT alarms.*,
      (SELECT COUNT(*)
        FROM upvotes
        WHERE upvotes.alarm_id = alarms.id
      ) AS upvoteCount FROM alarms
    `);
  };

  this.alarmsCreate = function(attributes) {
    return db.one(`
      INSERT INTO alarms (content)
      VALUES ($1)
      RETURNING *;
    `, [ attributes.content ])
  };

  this.upvotesCreate = function(attributes) {
    return db.one(`
      INSERT INTO upvotes (alarm_id)
      VALUES ($1)
      RETURNING *;
    `, [ attributes.alarmId ])
  };

  this.upvotesGet = function(attributes) {
  };
}

var db = new Db()
module.exports = db;
