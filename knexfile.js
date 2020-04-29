require('dotenv').config()
// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    // connection: {
    //   database: process.env.DEV_DB_NAME,
    //   user: process.env.DEV_DB_USER,
    //   password: process.env.DEV_DB_PASS
    // },
    connection: process.env.DEV_LOCAL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },

  test: {
    client: "pg",
    // connection: {
    //   database: process.env.DEV_DB_NAME,
    //   user: process.env.DEV_DB_USER,
    //   password: process.env.DEV_DB_PASS
    // },
    connection: "postgresql://localhost/home-run-test",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },

  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  },

  production: {
    client: "pg",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds"
    }
  }
};
