const path = require('path');

module.exports = (host, port, username, password, database, synchronize, entities) => {
  return {
    type: "postgres",
    host,
    port,
    username,
    password,
    database,
    synchronize,
    logging: false,
    entities,
    migrations: [path.join(__dirname, '../dist/migrations/**/*.js')],
    subscribers: [],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  }
};
