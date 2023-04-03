module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV != 'production',
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migration/*.ts"],
  subscribers: ["src/subscriber/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
