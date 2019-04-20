'use strict';

const mysqlPool = require('../../../databases/mysql-pool');


async function unsubscribeCourse(req, res, next) {
    const { uuid } = req.claims;
    const { courseId } = req.query;


    try {


        const connection = await mysqlPool.getConnection();

        const courseQuery = `SELECT creator FROM courses WHERE course_id = '${courseId}'`;

        const [courseResult] = await connection.query(courseQuery);
        const [{ creator }] = courseResult;


        if (creator == uuid) {
            connection.release();
            return res.send('You are the creator');
        }

        const usersQuery = `SELECT id FROM users WHERE uuid = '${uuid}'`;

        const [userResult] = await connection.query(usersQuery);
        const [{ id: userId }] = userResult;
        const deleteQuery = `DELETE FROM users_courses WHERE user_id = '${userId}' AND course_id = '${courseId}'`;


        await connection.query(deleteQuery);
        connection.release();
        return res.status(204).json();

    } catch (e) {
        // create error
        next(e);
    }
}

module.exports = unsubscribeCourse;