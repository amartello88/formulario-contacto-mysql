import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",          // si usás otro usuario, avisame
  password: "",          // poné tu password si tenés
  database: "formulario_contacto",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
