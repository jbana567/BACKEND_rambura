const express = require("express");

const {
    addTransaction,
    getTransactions,
    getTransaction
} = require("../../../Controller/inventoryTransactionController");

module.exports = (db) => {

    const router = express.Router();

    /**
     * @swagger
     * /inventoryTransanction:
     *   get:
     *     summary: Get all inventory transactions
     *     tags: [Inventory Transactions]
     *     responses:
     *       200:
     *         description: List of inventory transactions
     *       500:
     *         description: Server error
     */
    router.get("/", getTransactions(db));

    /**
     * @swagger
     * /inventoryTransanction/{id}:
     *   get:
     *     summary: Get one inventory transaction
     *     tags: [Inventory Transactions]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Inventory transaction found
     *       400:
     *         description: Invalid transaction ID
     *       404:
     *         description: Transaction not found
     */
    router.get("/:id", getTransaction(db));

    /**
     * @swagger
     * /inventoryTransanction:
     *   post:
     *     summary: Add inventory transactions
     *     tags: [Inventory Transactions]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: array
     *             items:
     *               type: object
     *     responses:
     *       201:
     *         description: Inventory transactions added successfully
     *       400:
     *         description: Invalid request body
     *       500:
     *         description: Server error
     */
    router.post("/", addTransaction(db));

    return router;
};

