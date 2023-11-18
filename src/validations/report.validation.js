const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReport = {
  body: Joi.object().keys({
    client: Joi.string().required().email(),
    paid: Joi.string(),
    positive: Joi.string(),
    rating: Joi.string(),
  }),
};

const getReports = {
  query: Joi.object().keys({
    client: Joi.string(),
    rating: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateReport = {
    params: Joi.object().keys({
      reportId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        client: Joi.string(),
      })
      .min(1),
  };
  
  const deleteReport = {
    params: Joi.object().keys({
      reportId: Joi.string().custom(objectId),
    }),
  };
  

module.exports = {
  createReport,
  getReports,
  deleteReport
};
