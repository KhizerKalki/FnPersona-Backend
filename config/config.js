require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "defaultpassword",
    database: process.env.DB_DATABASE || "Persona-backend",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "defaultpassword",
    database: process.env.DB_DATABASE || "Persona-backend-test",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "defaultpassword",
    database: process.env.DB_DATABASE || "Persona-backend",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
  },
};
