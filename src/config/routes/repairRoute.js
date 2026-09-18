const express = require("express");

const {
  getRepairs,
  getRepair,
  addRepair,
  updateRepair,
  deleteRepair
} = require("../../../Controller/repairController");

module.exports = (db) => {
  const router = express.Router();

  /**
   * @swagger
   * tags:
   *   name: Repairs
   *   description: Repair management API
   */

  /**
   * @swagger
   * /repair:
   *   get:
   *     summary: Get all repairs
   *     tags: [Repairs]
   *     responses:
   *       200:
   *         description: Repairs retrieved successfully
   *       500:
   *         description: Failed to get repairs
   */
  router.get("/", getRepairs(db));

  /**
   * @swagger
   * /repair/{id}:
   *   get:
   *     summary: Get a repair by ID
   *     tags: [Repairs]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Repair ID
   *     responses:
   *       200:
   *         description: Repair retrieved successfully
   *       400:
   *         description: Invalid repair ID
   *       404:
   *         description: Repair not found
   *       500:
   *         description: Failed to get repair
   */
  router.get("/:id", getRepair(db));

  /**
   * @swagger
   * /repair:
   *   post:
   *     summary: Add repairs
   *     tags: [Repairs]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: array
   *             items:
   *               type: object
   *               properties:
   *                 item:
   *                   type: string
   *                   example: Laptop
   *                 description:
   *                   type: string
   *                   example: Screen repair
   *                 status:
   *                   type: string
   *                   example: Pending
   *     responses:
   *       201:
   *         description: Repairs added successfully
   *       400:
   *         description: Invalid request body
   *       500:
   *         description: Failed to add repair
   */
  router.post("/", addRepair(db));

  /**
   * @swagger
   * /repair/{id}:
   *   patch:
   *     summary: Update a repair
   *     tags: [Repairs]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Repair ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               item:
   *                 type: string
   *                 example: Laptop
   *               description:
   *                 type: string
   *                 example: Screen replaced
   *               status:
   *                 type: string
   *                 example: Completed
   *     responses:
   *       200:
   *         description: Repair updated successfully
   *       400:
   *         description: Invalid repair ID
   *       404:
   *         description: Repair not found
   *       500:
   *         description: Failed to update repair
   */
  router.patch("/:id", updateRepair(db));

  /**
   * @swagger
   * /repair/{id}:
   *   delete:
   *     summary: Delete a repair
   *     tags: [Repairs]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: Repair ID
   *     responses:
   *       200:
   *         description: Repair deleted successfully
   *       400:
   *         description: Invalid repair ID
   *       404:
   *         description: Repair not found
   *       500:
   *         description: Failed to delete repair
   */
  router.delete("/:id", deleteRepair(db));

  return router;
};