const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createStore = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    active: Joi.string(),
  }),
};

const getStores = {
  query: Joi.object().keys({
    name: Joi.string(),
    active: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getStore = {
    params: Joi.object().keys({
      storeId: Joi.string().custom(objectId),
    }),
};

const updateStore = {
    params: Joi.object().keys({
      storeId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        name: Joi.string(),
    }),
  };
  
  const deleteStore = {
    params: Joi.object().keys({
      storeId: Joi.string().custom(objectId),
    }),
  };
  

module.exports = {
  createStore,
  getStores,
  getStore,
  updateStore,
  deleteStore
};
