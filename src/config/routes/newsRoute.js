const express = require("express");

const {
    getnews,
    getnew,
    addnews,
    updatenews,
    deletnews   
} = require("../../../Controller/newscontroller");

module.exports = (db) => {

    const router = express.Router();
    //-------------------------------------------------
    //  ---------  ROUTE TO GET ALL NEWS ------------------------
    //---------------------------------
    /**
     * @swagger
     * /news: 
     *   get:
     *     summary: Get all news
     *     description: Returns a list of all news items stored in the database.
     *     responses:
     *       '200':
     *         description: news retrieved successfully.
     *       '500':
     *         description: Server error
     */

    router.get("/", getnews(db));

    //-------------------------------------------------
    //  ---------   ROUTE TO GET ONE NEWS   ------------------------
    //---------------------------------
    /**
     * @swagger
     * /news/{id}:
     *   get:
     *     summary: Get one news item
     *     description: Returns a single news item using their MongoDB ObjectId.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: MongoDB ObjectId of the news item.
     *         schema:
     *           type: string
     *           example: 64f123456789abcdef123456
     *     responses:
     *       '200':
     *         description: news retrieved successfully.
     *       '400':
     *         description: Invalid news ID.
     *       '404':
     *         description: news not found.
     *       '500':
     *         description: Server error.
     */

    router.get("/:id", getnew(db));

    //-------------------------------------------------
    //  ---------   ROUTE FOR CREATING NEWS------------------------
    //---------------------------------
    /**
     * @swagger
     * /news:
     *   post:
     *     summary: Create news items
     *     description: Creates one or more news items in the database.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: array
     *             items:
     *               type: object
     *               required:
     *                 - name
     *                 - email
     *                 - password
     *                 - role
     *                 - active
     *               properties:
     *                 name:
     *                   type: string
     *                   example: John Doe
     *                 email:
     *                   type: string
     *                   example: JohnDoe@yahoo.com
     *                 password:
     *                   type: string
     *                   example: doe@123
     *                 role:
     *                   type: string
     *                   example: teacher
     *                 active:
     *                   type: boolean
     *                   example: true
     *     responses:
     *       '201':
     *         description: news created successfully.
     *       '400':
     *         description: Invalid request body.
     *       '500':
     *         description: Server error.
     */

    router.post("/", addnews(db));

    //-------------------------------------------------
    //  ---------   ROUTE FOR UPDATING NEWS------------------------
    //---------------------------------
    /**
     * @swagger
     * /news/{id}:
     *   patch:
     *     summary: Update a news item
     *     description: Updates the information of one news item.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: MongoDB ObjectId of the news item.
     *         schema:
     *           type: string
     *           example: 64f123456789abcdef123456
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: John Doe
     *               email:
     *                 type: string
     *                 example: JohnDoe@yahoo.com
     *               password:
     *                 type: string
     *                 example: doe@123
     *               role:
     *                 type: string
     *                 example: teacher
     *               active:
     *                 type: boolean
     *                 example: true
     *     responses:
     *       '200':
     *         description: News item updated successfully.
     *       '400':
     *         description: Invalid news item ID.
     *       '404':
     *         description: News item not found.
     *       '500':
     *         description: Server error.
     */

    router.patch("/:id", updatenews(db));

    //-------------------------------------------------
    //  --------- ROUTE FOR DELETING NEWS------------------------
    //---------------------------------
    /**
     * @swagger
     * /news/{id}:
     *   delete:
     *     summary: Delete a news item
     *     description: Permanently deletes one news item from the database.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: MongoDB ObjectId of the news item.
     *         schema:
     *           type: string
     *           example: 64f123456789abcdef123456
     *     responses:
     *       '200':
     *         description: News item deleted successfully.
     *       '400':
     *         description: Invalid news item ID.
     *       '404':
     *         description: News item not found.
     *       '500':
     *         description: Server error.
     */

    router.delete("/:id", deletnews(db));

    return router;

}