const express = require("express");

const {
    getusers,
    getuser,
    adduser,
    updateuser,
    deletuser
} = require("../../../Controller/userController");

module.exports = (db) => {

    const router = express.Router();
    //-------------------------------------------------
    //  ---------  ROUTE TO GET ALL USERS ------------------------
    //---------------------------------
    /**
     * @swagger
     * /user:
     *   get:
     *     summary: Get all users
     *     description: Returns a list of all users stored in the database.
     *     responses:
     *       '200':
     *         description: users retrieved successfully.
     *       '500':
     *         description: Server error
     */

    router.get("/", getusers(db));

    //-------------------------------------------------
    //  ---------   ROUTE TO GET ONE USER   ------------------------
    //---------------------------------
    /**
     * @swagger
     * /user/{id}:
     *   get:
     *     summary: Get one user
     *     description: Returns a single user using their MongoDB ObjectId.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: MongoDB ObjectId of the user.
     *         schema:
     *           type: string
     *           example: 64f123456789abcdef123456
     *     responses:
     *       '200':
     *         description: user retrieved successfully.
     *       '400':
     *         description: Invalid student ID.
     *       '404':
     *         description: user not found.
     *       '500':
     *         description: Server error.
     */

    router.get("/:id", getuser(db));

    //-------------------------------------------------
    //  ---------   ROUTE FOR CREATING USER------------------------
    //---------------------------------
    /**
     * @swagger
     * /user:
     *   post:
     *     summary: Create users
     *     description: Creates one or more user in the database.
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
     *         description: user created successfully.
     *       '400':
     *         description: Invalid request body.
     *       '500':
     *         description: Server error.
     */

    router.post("/", adduser(db));

    //-------------------------------------------------
    //  ---------   ROUTE FOR UPDATING USER------------------------
    //---------------------------------
    /**
     * @swagger
     * /user/{id}:
     *   patch:
     *     summary: Update a user
     *     description: Updates the information of one user.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: MongoDB ObjectId of the user.
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
     *         description: User updated successfully.
     *       '400':
     *         description: Invalid user ID.
     *       '404':
     *         description: User not found.
     *       '500':
     *         description: Server error.
     */

    router.patch("/:id", updateuser(db));

    //-------------------------------------------------
    //  --------- ROUTE FOR DELETING USER------------------------
    //---------------------------------
    /**
     * @swagger
     * /user/{id}:
     *   delete:
     *     summary: Delete a user
     *     description: Permanently deletes one user from the database.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: MongoDB ObjectId of the user.
     *         schema:
     *           type: string
     *           example: 64f123456789abcdef123456
     *     responses:
     *       '200':
     *         description: Student deleted successfully.
     *       '400':
     *         description: Invalid student ID.
     *       '404':
     *         description: Student not found.
     *       '500':
     *         description: Server error.
     */

    router.delete("/:id", deletuser(db));

    return router;

}

