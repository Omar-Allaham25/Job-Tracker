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
}
module.exports = Application;
