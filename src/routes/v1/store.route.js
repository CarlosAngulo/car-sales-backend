const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const storeValidation = require('../../validations/store.validation');
const storeController = require('../../controllers/store.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(storeValidation.createStore), storeController.createStoreByAdmin)
  .get(auth('getUsers'), validate(storeValidation.getStores), storeController.getStores);

router
  .route('/:storeId')
  .get(auth('getUsers'), validate(storeValidation.getStore), storeController.getStore)
  .patch(auth('manageUsers'), validate(storeValidation.updateStore), storeController.updateStore)
  .delete(auth('manageUsers'), validate(storeValidation.deleteStore), storeController.deleteStore);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Stores
 *   description: Store management and retrieval
 */

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Create a store
 *     description: Only admins can create other stores.
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - active
 *             properties:
 *               name:
 *                 type: string
 *               active:
 *                 type: boolean
 *             example:
 *               name: nissan
 *               active: true
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Store'
 *       "400":
 *         $ref: '#/components/responses/Paila'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all stores
 *     description: Only admins can retrieve all stores.
 *     tags: [Stores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Store name
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Store active
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of stores
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Store'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

