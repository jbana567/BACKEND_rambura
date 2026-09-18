
const express = require("express");

const {
    addInventoryItem,
    getInventoryItems,
    getInventoryItem,
    updateInventoryItem,
    deletInventoryItem
} = require("../../../Controller/inventoryItemController");

module.exports = (db) => {

    const router = express.Router();

    /**
     * @swagger
     * /inventoryItem:
     *   get:
     *     summary: Get all inventory items
     *     tags: [Inventory Items]
     *     responses:
     *       200:
     *         description: List of inventory items
     *       500:
     *         description: Server error
     */
    router.get("/", getInventoryItems(db));

    /**
     * @swagger
     * /inventoryItem/{id}:
     *   get:
     *     summary: Get one inventory item
     *     tags: [Inventory Items]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Inventory item found
     *       400:
     *         description: Invalid item ID
     *       404:
     *         description: Inventory item not found
     */
    router.get("/:id", getInventoryItem(db));

    /**
     * @swagger
     * /inventoryItem:
     *   post:
     *     summary: Add inventory items
     *     tags: [Inventory Items]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: array
     *             items:
     *               type: object
     *               properties:
     *                 name:
     *                   type: string
     *                 quantity:
     *                   type: number
     *                 description:
     *                   type: string
     *     responses:
     *       201:
     *         description: Inventory items added successfully
     *       400:
     *         description: Invalid request body
     *       500:
     *         description: Server error
     */
    router.post("/", addInventoryItem(db));

    /**
     * @swagger
     * /inventoryItem/{id}:
     *   patch:
     *     summary: Update an inventory item
     *     tags: [Inventory Items]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *     responses:
     *       200:
     *         description: Inventory item updated successfully
     *       400:
     *         description: Invalid item ID
     *       404:
     *         description: Inventory item not found
     */
    router.patch("/:id", updateInventoryItem(db));

    /**
     * @swagger
     * /inventoryItem/{id}:
     *   delete:
     *     summary: Delete an inventory item
     *     tags: [Inventory Items]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Inventory item deleted successfully
     *       400:
     *         description: Invalid item ID
     *       404:
     *         description: Inventory item not found
     */
    router.delete("/:id", deletInventoryItem(db));

    return router;
};

