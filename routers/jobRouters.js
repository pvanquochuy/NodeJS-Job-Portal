import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { createJobController, getAllJobsController, updateJobController, deleteJobController, jobStatsFilterController } from '../controllers/jobController.js'

const router = express.Router()

//router


// routers
/**
 * @swagger
 * components:
 *  schemas:
 *    Job:
 *      type: object
 *      properties:
 *        company:
 *          type: string
 *          description: Company name
 *        position:
 *          type: string
 *          description: Position name
 *        status:
 *          type: string
 *          description: Status job
 *        workType:
 *          type: string
 *          description: workt type job
 *        workLocation:
 *          type: string
 *          description: work Location 
 *        createdBy:
 *          type:  string
 *          description: Created By
 *      example:
 *        company: NextTech
 *        position: Intern
 *        status: pending
 *        workType: full-time  
 *        workLocation: Ha Noi
 *        createdBy: 660bbc001619e09002c2fd58
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 * 
 */

/**
 *  @swagger
 *  tags:
 *    name: Jobs
 *    description: Jobs option
 */

/**
 * @swagger
 * /api/v1/job/create-job:
 *    post:
 *      summary: create new job
 *      tags: [Jobs]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *      responses:
 *        200:
 *          description: Job created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Job'
 *        500:
 *          description: internal serevr error
 */

// CREATE JOB || JOB
router.post('/create-job', userAuth  ,createJobController)



/**
 * @swagger
 * /api/v1/job/get-jobs:
 *  get:
 *    summary: Get list of jobs
 *    tags: [Jobs]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      default:
 *        description: List of jobs retrieved successfully
 *        operationOd: getJobs
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Job'
 *      401:
 *        description: Unauthorized, token is missing or invalid
 * 
 */
// GET JOBS || GET
// router.get('/get-jobs', userAuth, getAllJobsController)
router.get('/get-jobs', userAuth ,getAllJobsController)


/**
 * @swagger
 * /api/v1/job/update-job/{id}:
 *   patch:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *                 description: Company name
 *               position:
 *                 type: string
 *                 description: Position name
 *             required:
 *               - company
 *               - position
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updateJob:
 *                   $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request, missing required fields
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       403:
 *         description: Forbidden, user is not authorized to update this job
 *       404:
 *         description: Not found, no job found with the provided ID
 *       500:
 *         description: Internal server error
 */

// UPDATE JOBS || PUT || PATCH
router.patch('/update-job/:id', userAuth, updateJobController)

/**
 * @swagger
 * /api/v1/job/delete-job/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *                   example: Success, Job deleted!
 *       400:
 *         description: Bad request, invalid job ID format
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       403:
 *         description: Forbidden, user is not authorized to delete this job
 *       404:
 *         description: Not found, no job found with the provided ID
 *       500:
 *         description: Internal server error
 */

// DELETE JOBS || DLETE
router.delete('/delete-job/:id', userAuth, deleteJobController)

/**
 * @swagger
 * /api/v1/job/job-stats-filter:
 *   get:
 *     summary: Get job statistics and filters
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job statistics and filters retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalJob:
 *                   type: number
 *                   description: Total number of jobs
 *                 stats:
 *                   type: array
 *                   description: Statistics of jobs by status
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Status of the job
 *                       count:
 *                         type: number
 *                         description: Number of jobs with this status
 *                 defaultStats:
 *                   type: object
 *                   description: Default statistics
 *                   properties:
 *                     pending:
 *                       type: number
 *                       description: Number of jobs in pending status
 *                     reject:
 *                       type: number
 *                       description: Number of jobs in reject status
 *                     interview:
 *                       type: number
 *                       description: Number of jobs in interview status
 *                 monthlyApplication:
 *                   type: array
 *                   description: Monthly application statistics
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: object
 *                         properties:
 *                           year:
 *                             type: number
 *                             description: Year of the application
 *                           month:
 *                             type: number
 *                             description: Month of the application
 *                       count:
 *                         type: number
 *                         description: Number of applications in that month
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *       500:
 *         description: Internal server error
 */

// DELETE  FILTER || GET
router.get('/job-stats-filter', userAuth, jobStatsFilterController)

export default router