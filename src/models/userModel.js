const db = require("./../config/db");
class User {
  static async create(name, email, password) {
    const sql = "INSERT INTO users (name,email,password) VALUES (?,?,?)";
    const [result] = await db.execute(sql, [name, email, password]);
    return result;
  }
  static async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
  }
  static async findById(id) {
    const sql = "SELECT id ,name,email FROM users WHERE id= ?";
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  }
}

module.exports = User;
