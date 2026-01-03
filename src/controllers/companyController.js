const Company = require("../models/companyModel");

exports.addCompany = async (req, res) => {
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
};

exports.getCompanies = async (req, res) => {
  const userId = req.user.id;
  const companies = await Company.findUserId(userId);
  res.status(200).json({
    status: "success",
    companies,
  });
};
