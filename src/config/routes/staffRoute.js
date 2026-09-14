const express = require("express");

const {
    getstaffs,
    getstaff,
    addstaff,
    updatestaff,
    deletstaff   
} = require("../../../Controller/staffcontroller");

module.exports = (db) => {

    const router = express.Router();
    //-------------------------------------------------
    //  ---------  ROUTE TO GET ALL STAFF ------------------------
    //---------------------------------
    /**
     * @swagger
     * /staff: 
     *   get:
     *     summary: Get all staff
     *     description: Returns a list of all staff members stored in the database.
     *     responses:
     *       '200':
     *         description: staff retrieved successfully.
     *       '500':
     *         description: Server error
     */

    router.get("/", getstaffs(db));

    //-------------------------------------------------
    //  ---------   ROUTE TO GET ONE STAFF MEMBER   ------------------------
    //---------------------------------
    /**
     * @swagger
     * /staff/{id}:
     *   get:
     *     summary: Get one staff member
     *     description: Returns a single staff member using their MongoDB ObjectId.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: MongoDB ObjectId of the staff member.
     *         schema:
     *           type: string
     *           example: 64f123456789abcdef123456
     *     responses:
     *       '200':
     *         description: staff retrieved successfully.
     *       '400':
     *         description: Invalid staff ID.
     *       '404':
     *         description: staff not found.
     *       '500':
     *         description: Server error.
     */

    router.get("/:id", getstaff(db));

    //-------------------------------------------------
    //  ---------   ROUTE FOR CREATING STAFF------------------------
    //---------------------------------
    /**
     * @swagger
     * /staff:
     *   post:
     *     summary: Create staff members
     *     description: Creates one or more staff members in the database.
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
     *         description: staff created successfully.
     *       '400':
     *         description: Invalid request body.
     *       '500':
     *         description: Server error.
     */

    router.post("/", addstaff(db));

    //-------------------------------------------------
    //  ---------   ROUTE FOR UPDATING STAFF------------------------
    //---------------------------------
    /**
     * @swagger
     * /staff/{id}:
     *   patch:
     *     summary: Update a staff member
     *     description: Updates the information of one staff member.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: MongoDB ObjectId of the staff member.
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
     *         description: Staff member updated successfully.
     *       '400':
     *         description: Invalid staff ID.
     *       '404':
     *         description: Staff member not found.
     *       '500':
     *         description: Server error.
     */

    router.patch("/:id", updatestaff(db));

    //-------------------------------------------------
    //  --------- ROUTE FOR DELETING STAFF------------------------
    //---------------------------------
    /**
     * @swagger
     * /staff/{id}:
     *   delete:
     *     summary: Delete a staff member
     *     description: Permanently deletes one staff member from the database.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: MongoDB ObjectId of the staff member.
     *         schema:
     *           type: string
     *           example: 64f123456789abcdef123456
     *     responses:
     *       '200':
     *         description: Staff member deleted successfully.
     *       '400':
     *         description: Invalid staff ID.
     *       '404':
     *         description: Staff member not found.
     *       '500':
     *         description: Server error.
     */

    router.delete("/:id", deletstaff(db));

    return router;

}