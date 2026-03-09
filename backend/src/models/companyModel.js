const db = require("../config/db");

class Company {
  static async create(name, location, userId) {
    const sql = "insert into companies (name,location,user_id) values(?,?,?)";
    const [result] = await db.execute(sql, [name, location, userId]);
    return result;
  }
  static async findUserId(userId) {
    const sql =
      "select * from companies where user_id=? order by created_at desc";
    const [rows] = await db.execute(sql, [userId]);
    return rows;
  }
}
module.exports = Company;
