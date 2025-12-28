const { application } = require("express");
const Application = require("../models/applicationModel");

exports.createApplication = async (req, res) => {
  try {
    const { job_title, status, application_date, notes, company_id } = req.body;
    if (!job_title || !company_id) {
      return res.status(400).json({
        status: "failed",
        message: "Job title and Company ID are required",
      });
    }
    const applicationdata = {
      job_title,
      status,
      application_date,
      notes,
      company_id,
      user_id: req.user.id,
    };
    const result = await Application.create(applicationdata);
    res.status(201).json({
      status: "success",
      message: "Application created successfully",
      application_id: result.insertId,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.findByUserId(req.user.id);
    res.status(200).json({
      status: "success",
      applications,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
