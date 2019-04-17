'use strict';

const mysqlPool = require('../../../databases/mysql-pool');


async function getUserCourses(req, res, next) {

    const { uuid } = req.claims;

    const coursesQuery = `SELECT u.full_name, c.course_id, c.title, c.description, c.created_at, c.creator
    FROM users u
    INNER JOIN users_courses uc ON uc.user_id = u.id 
    INNER JOIN courses c ON c.course_id = uc.course_id
    WHERE c.creator = '${uuid}'`;

    try {
        const connection = await mysqlPool.getConnection();
        const [result] = await connection.query(coursesQuery);

        return res.send(result);
    } catch (e) {
        next(e);
    }
}

module.exports = getUserCourses;