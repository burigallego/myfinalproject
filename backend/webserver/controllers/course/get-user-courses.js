'use strict';

const mysqlPool = require('../../../databases/mysql-pool');


async function getUserCourses(req, res, next) {

    const { uuid } = req.claims;

    const coursesQuery = `SELECT c.course_id, c.title, c.created_at, c.creator, c.description, c.creator_name 
    FROM courses c
    INNER JOIN users_courses uc ON uc.course_id = c.course_id 
    INNER JOIN users u ON u.id = uc.user_id
    WHERE uuid = '${uuid}'`;

    try {
        const connection = await mysqlPool.getConnection();
        const [result] = await connection.query(coursesQuery);

        return res.send(result);
    } catch (e) {
        next(e);
    }
}

module.exports = getUserCourses;