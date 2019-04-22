'use strict';

const Joi = require('joi');
const mysqlPool = require('../../../databases/mysql-pool');

async function validate(payload) {
    const schema = {
        title: Joi.string().allow(null),
        description: Joi.string().allow(null),
        courseId: Joi.number().integer().positive().allow(0),
    };

    return Joi.validate(payload, schema);
}

async function updateCourseIntoDatabase(title, description, courseId) {


    const sqlUpdateQuery = `UPDATE courses
    SET  title = '${title}', description = '${description}'
    WHERE course_id='${courseId}'`;

    try {
        const connection = await mysqlPool.getConnection();
        const resultUpdate = await connection.query(sqlUpdateQuery);
        connection.release();

    } catch (e) {
        console.log(e);
    }

    return courseId;
}

async function editCourse(req, res, next) {
    const courseUpdateProfile = { ...req.body };
    const { courseId } = req.query;
    const { uuid, role } = req.claims;
    courseUpdateProfile.courseId = courseId;

    /**
     * 1. validator datos
     */
    try {
        await validate(courseUpdateProfile);

    } catch (e) {
        return res.status(400).send(e);
    }
    const {
        title,
        description
    } = courseUpdateProfile;

    try {
        /**
         * Create the user and send response
         */
        if (role != 'admin') {
            res.status(403).send('Unauthorized user');
        }

        await updateCourseIntoDatabase(title, description, courseId);

        res.status(204).json();


    } catch (e) {
        console.error(e);
        res.status(500).json();
    }



}

module.exports = editCourse;
