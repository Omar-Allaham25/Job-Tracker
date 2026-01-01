const db = require("../config/db");

class Application {
  static async create(applicationData) {
    const { job_title, status, application_date, notes, company_id, user_id } =
      applicationData;
    const sql =
      "insert into applications  (job_title, status, application_date, notes, company_id, user_id) values (?,?,?,?,?,?)";
    const [result] = await db.execute(sql, [
      job_title,
      status || "Applied",
      application_date || new Date(),
      notes,
      company_id,
      user_id,
    ]);
    return result;
  }
  static async findByUserId(userId) {
    const sql =
      "select applications.*,companies.name as company_name,companies.location from  applications join companies on applications.company_id=companies.id where applications.user_id=? order by applications.created_at desc";
    const [rows] = await db.execute(sql, [userId]);
    return rows;
  }
  static async update(id, userId, data) {
    const fields = [];
    const values = [];
    if (data.job_title) {
      fields.push("job_title =?");
      values.push(data.job_title);
    }
    if (data.status) {
      fields.push("status =?");
      values.push(data.status);
    }
    if (data.notes) {
      fields.push("notes =?");
      values.push(data.notes);
    }
    if (fields.length === 0) return { affectedRows: 0 };
    values.push(id, userId);
    const sql = `update applications set ${fields.join(
      ", "
    )} where id=? and user_id=?`;
    const [result] = await db.execute(sql, values);
    return result;
  }
  static async delete(id, userId) {
    const sql = "delete from applications where id=? and user_id =?";
    console.log(id, userId);
    const [result] = await db.execute(sql, [id, userId]);
    return result;
  }
}
module.exports = Application;
