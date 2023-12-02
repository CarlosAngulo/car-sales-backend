const httpStatus = require('http-status');
const { Report } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a report
 * @param {Object | Array<Object>} reportBody
 * @returns {Promise<Report>}
 */
const createReport = async (reportBody) => {
  return Report.create(reportBody);
};

/**
 * Create a report
 * @param {Array} reporstBody
 * @returns {Promise<Report[]>}
 */
const createReports = async (reportsBody) => {
  return Report.insertMany(reportsBody);
};

/**
 * Query for reports
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryReports = async (filter, options) => {
    const report = await Report.paginate(filter, options);
    return report;
};

/**
 * Query for reports
 * @param {Object} filter - Mongo filter
 * @returns {Promise<number>}
 */
const numReportsByUser = async (filter) => {
  const numReports = await Report.count(filter);
  return numReports;
};

/**
 * Get report by id
 * @param {ObjectId} id
 * @returns {Promise<Report>}
 */
const getReportById = async (id) => {
    return Report.findById(id);
};

/**
 * Update report by id
 * @param {ObjectId} reportId
 * @param {Object} updateBody
 * @returns {Promise<Report>}
 */
const updateReportById = async (reportId, updateBody) => {
    const report = await getReportById(reportId);
    if (!report) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
    }
    Object.assign(report, updateBody);
    await report.save();
    return report;
};

/**
 * Delete report by id
 * @param {ObjectId} reportId
 * @returns {Promise<Report>}
 */
const deleteReportById = async (reportId) => {
    const report = await getReportById(reportId);
    if (!report) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
    }
    await report.remove();
    return report;
  };

module.exports = {
  createReport,
  createReports,
  numReportsByUser,
  queryReports,
  getReportById,
  updateReportById,
  deleteReportById
};
