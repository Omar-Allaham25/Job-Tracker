const Company = require("../models/companyModel");

exports.addCompany = async (req, res) => {
  try {
    const { name, location } = req.body;
    if (!name) {
      return res.status(400).json({
        status: "failed",
        message: "please write company name",
      });
    }
    userID = req.user.id;
    const result = await Company.create(name, location, userID);
    res.status(201).json({
      status: "success",
      message: "Company added successfully",
      companyId: result.id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const userId = req.user.id;
    const companies = await Company.findUserId(userId);
    res.status(200).json({
      status: "success",
      companies,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "failed",
      message: "Server Error",
    });
  }
};
