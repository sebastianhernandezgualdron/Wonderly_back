
import knex from "knex";

const db = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "wonderly",
  },
});

export { db };
