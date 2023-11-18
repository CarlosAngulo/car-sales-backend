const httpStatus = require('http-status');
const { Report } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a report
 * @param {Object} reportBody
 * @returns {Promise<Report>}
 */
const createReport = async (reportBody) => {
  return Report.create(reportBody);
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
 * Get report by id
 * @param {ObjectId} id
 * @returns {Promise<Report>}
 */
const getReportById = async (id) => {
    return Report.findById(id);
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateReportById = async (reportId, updateBody) => {
    console.log(reportId)
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
 * @returns {Promise<User>}
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
  queryReports,
  getReportById,
  updateReportById,
  deleteReportById
};
