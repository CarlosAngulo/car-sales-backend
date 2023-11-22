const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { reportService } = require('../services');

const createReport = catchAsync(async (req, res) => {
  const report = Array.isArray(req.body) 
  ? await reportService.createReports(req.body)
  : await reportService.createReport(req.body)
  res.status(httpStatus.CREATED).send(report);
});

const getReports = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['client', 'rating', 'store']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await reportService.queryReports(filter, options);
  res.send(result);
});

const getReport = catchAsync(async (req, res) => {
  const report = await reportService.getReportById(req.params.reportId);
  if (!report) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
  }
  res.send(report);
});

const updateReport = catchAsync(async (req, res) => {
  const report = await reportService.updateReportById(req.params.reportId, req.body);
  res.send(report);
});

const deleteReport = catchAsync(async (req, res) => {
  await reportService.deleteReportById(req.params.reportId);
  res.send({id: req.params.reportId});
});

module.exports = {
  createReport,
  getReports,
  getReport,
  updateReport,
  deleteReport
};
