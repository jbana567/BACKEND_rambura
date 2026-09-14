const express =require("express");

const {
    getdepartments,
    getdepartment,
    adddepartment,
    updatedepartment,
    deletdepartment   
} =require("../../../Controller/departmentsController");

module.exports = (db) => {

    const router = express.Router();
    //-------------------------------------------------
    //  ---------  ROUTE TO GET ALL DEPARTMENTS ------------------------
    //---------------------------------
    /**
     * @swagger
     * /department :
     *   get:
     *     summary: Get all departments
     *     description: Returns a list of all departments stored in the database.
     *     responses:
     *       '200':
     *         description: departments retrieved successfully.
     *       '500':
     *         description: Server error
     */

    router.get("/",getdepartments(db));

    //-------------------------------------------------
    //  ---------   ROUTE TO GET ONE DEPARTMENT   ------------------------
    //---------------------------------
    /**
     * @swagger
     * /department/{id}:
     *   get:
     *     summary: Get one department
     *     description: Returns a single department using their MongoDB ObjectId.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: MongoDB ObjectId of the department.
     *         schema:
     *           type: string
     *           example: 64f123456789abcdef123456
     *     responses:
     *       '200':
     *         description: department retrieved successfully.
     *       '400':
     *         description: Invalid department ID.
     *       '404':
     *         description: department not found.
     *       '500':
     *         description: Server error.
     */

    router.get("/:id", getdepartment(db));

    //-------------------------------------------------
    //  ---------   ROUTE FOR CREATING DEPARTMENT------------------------
    //---------------------------------
    /**
     * @swagger
     * /department:
     *   post:
     *     summary: Create departments
     *     description: Creates one or more department in the database.
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
     *         description: department created successfully.
     *       '400':
     *         description: Invalid request body.
     *       '500':
     *         description: Server error.
     */

    router.post("/", adddepartment(db));

    //-------------------------------------------------
    //  ---------   ROUTE FOR UPDATING DEPARTMENT------------------------
    //---------------------------------
    /**
     * @swagger
     * /department/{id}:
     *   patch:
     *     summary: Update a department
     *     description: Updates the information of one department.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: MongoDB ObjectId of the department.
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
     *         description: Department updated successfully.
     *       '400':
     *         description: Invalid department ID.
     *       '404':
     *         description: Department not found.
     *       '500':
     *         description: Server error.
     */

    router.patch("/:id", updatedepartment(db));

    //-------------------------------------------------
    //  --------- ROUTE FOR DELETING DEPARTMENT------------------------
    //---------------------------------
    /**
     * @swagger
     * /department/{id}:
     *   delete:
     *     summary: Delete a department
     *     description: Permanently deletes one department from the database.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: MongoDB ObjectId of the department.
     *         schema:
     *           type: string
     *           example: 64f123456789abcdef123456
     *     responses:
     *       '200':
     *         description: Department deleted successfully.
     *       '400':
     *         description: Invalid department ID.
     *       '404':
     *         description: Department not found.
     *       '500':
     *         description: Server error.
     */

    router.delete("/:id", deletdepartment(db));

    return router;

}