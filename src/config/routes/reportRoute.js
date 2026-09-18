const express = require("express");

const {
  getreports,
  getreport,
  addreport,
  updatereport,
  deletreport
} = require("../../../Controller/reportController");

module.exports = (db) => {
  const router = express.Router();

  /**
   * @swagger
   * tags:
   *   name: Reports
   *   description: Reports API
   */

  /**
   * @swagger
   * /report:
   *   get:
   *     summary: Get all reports
   *     tags: [Reports]
   *     responses:
   *       200:
   *         description: Reports retrieved successfully
   *       500:
   *         description: Failed to get reports
   */
  router.get("/", getreports(db));

  /**
   * @swagger
   * /report/{id}:
   *   get:
   *     summary: Get a report by ID
   *     tags: [Reports]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Report ID
   *     responses:
   *       200:
   *         description: Report retrieved successfully
   *       400:
   *         description: Invalid report ID
   *       404:
   *         description: Report not found
   *       500:
   *         description: Failed to get report
   */
  router.get("/:id", getreport(db));

  /**
   * @swagger
   * /report:
   *   post:
   *     summary: Add reports
   *     tags: [Reports]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: array
   *             items:
   *               type: object
   *               properties:
   *                 title:
   *                   type: string
   *                   example: Monthly Inventory Report
   *                 description:
   *                   type: string
   *                   example: Inventory status for September
   *     responses:
   *       201:
   *         description: Reports added successfully
   *       400:
   *         description: Invalid request body
   *       500:
   *         description: Failed to add report
   */
  router.post("/", addreport(db));

  /**
   * @swagger
   * /report/{id}:
   *   patch:
   *     summary: Update a report
   *     tags: [Reports]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Report ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 example: Updated Inventory Report
   *               description:
   *                 type: string
   *                 example: Updated report description
   *     responses:
   *       200:
   *         description: Report updated successfully
   *       400:
   *         description: Invalid report ID
   *       404:
   *         description: Report not found
   *       500:
   *         description: Failed to update report
   */
  router.patch("/:id", updatereport(db));

  /**
   * @swagger
   * /report/{id}:
   *   delete:
   *     summary: Delete a report
   *     tags: [Reports]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Report ID
   *     responses:
   *       200:
   *         description: Report deleted successfully
   *       400:
   *         description: Invalid report ID
   *       404:
   *         description: Report not found
   *       500:
   *         description: Failed to delete report
   */
  router.delete("/:id", deletreport(db));

  return router;
};