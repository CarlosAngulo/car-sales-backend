const httpStatus = require('http-status');
const { Store } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a store
 * @param {Object} storeBody
 * @returns {Promise<Store>}
 */
const createStore = async (storeBody) => {
  return Store.create(storeBody);
};

/**
 * Query for stores
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStores = async (filter, options) => {
    const store = await Store.find(filter, options);
    return store;
};

/**
 * Get store by id
 * @param {ObjectId} id
 * @returns {Promise<Store>}
 */
const getStoreById = async (id) => {
    return Store.findById(id);
};

/**
 * Update store by id
 * @param {ObjectId} storeId
 * @param {Object} updateBody
 * @returns {Promise<Store>}
 */
const updateStoreById = async (storeId, updateBody) => {
    const store = await getStoreById(storeId);
    if (!store) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
    }
    Object.assign(store, updateBody);
    await store.save();
    return store;
};

/**
 * Delete store by id
 * @param {ObjectId} storeId
 * @returns {Promise<Store>}
 */
const deleteStoreById = async (storeId) => {
    const store = await getStoreById(storeId);
    if (!store) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
    }
    await store.remove();
    return store;
};

module.exports = {
  queryStores,
  createStore,
  getStoreById,
  updateStoreById,
  deleteStoreById
};
