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
    const userId = req.user.id;
    const filters = {
      status: req.query.status,
    };
    const applications = await Application.findByUserId(userId, filters);
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
exports.updateApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    const applicationId = req.params.id;
    const { job_title, status, notes } = req.body;

    const result = await Application.update(applicationId, userId, {
      job_title,
      status,
      notes,
    });
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "failed",
        message: "the Application not found or not authorized",
      });
    }
    res
      .status(200)
      .json({ status: "success", message: "Application updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
exports.deleteApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    const applicationId = req.params.id;
    const result = await Application.delete(applicationId, userId);
    console.log(result);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "failed",
        message: "the application not found or not authorized",
      });
    }
    res.status(204).json({ message: "The application deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
