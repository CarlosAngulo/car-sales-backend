const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reportValidation = require('../../validations/report.validation');
const reportController = require('../../controllers/report.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), reportController.createReport)
  .get(auth('getUsers'), validate(reportValidation.getReports), reportController.getReports);

router
  .route('/:reportId')
  .get(auth('getUsers'), validate(reportValidation.getReports), reportController.getReport)
  .patch(auth('manageUsers'), reportController.updateReport)
  .delete(auth('manageUsers'), validate(reportValidation.deleteReport), reportController.deleteReport);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Report management and retrieval
 */

/**
 * @swagger
 * /reports:
 *   post:
 *     summary: Create a report
 *     description: Only admins can create other reports.
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - client
 *             properties:
 *               client:
 *                 type: string
 *               paid:
 *                 type: number
 *               positive:
 *                 type: boolean
 *               rating:
 *                 type: number
 *               submitted:
 *                 type: string
 *                 format: date-time
 *               picture:
 *                 type: boolean
 *               platform:
 *                 type: string
 *               salesPerson:
 *                 type: string
 *                 format: uuid
 *             example:
 *               client: fake name
 *               paid: 10
 *               positive: true
 *               rating: 5
 *               submitted: 2023-11-15T14:30:00Z
 *               picture: true
 *               platform: Google
 *               salesPerson: 65538530a8f68d88b8361c40
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Report'
 *
 */
