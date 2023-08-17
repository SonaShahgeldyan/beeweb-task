import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "beeweb",
  password: "Stu%hg62808",
  port: 5432,
});

export default pool;
