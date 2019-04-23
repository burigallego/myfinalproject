'use strict';

const mysqlPool = require('../../../databases/mysql-pool');

async function getCourse(req, res, next) {

    const { courseId } = req.query;
    const courseQuery = `SELECT * FROM courses WHERE course_id = ${courseId}`;

    try {
        const connection = await mysqlPool.getConnection();
        const [result] = await connection.query(courseQuery);
        const [course] = result;
        connection.release();
        return res.send(course);
    } catch (e) {
        next(e);
    }
}

module.exports = getCourse;