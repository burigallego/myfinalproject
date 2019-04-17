'use strict';

const mysqlPool = require('../../../databases/mysql-pool');

async function subscribeCourse(req, res, next) {
    const { uuid } = req.claims;
    const { courseId } = req.query;
    const now = new Date();
    const subscribedAt = now.toISOString().substring(0, 19).replace('T', ' ');

    try {


        const connection = await mysqlPool.getConnection();

        const courseQuery = `SELECT creator FROM courses WHERE course_id = '${courseId}'`;

        const [courseResult] = await connection.query(courseQuery);
        const [{ creator }] = courseResult;


        if (creator == uuid) {
            connection.release();
            return res.send('Already subscribed');
        }

        const usersQuery = `SELECT id FROM users WHERE uuid = '${uuid}'`;

        const [userResult] = await connection.query(usersQuery);
        const [{ id: userId }] = userResult;

        await connection.query('INSERT INTO users_courses SET ?', {
            user_id: userId,
            course_id: courseId,
            subscribed_at: subscribedAt
        });
        connection.release();
        return res.status(204).json();

    } catch (e) {
        // create error
        next(e);
    }
}

module.exports = subscribeCourse;