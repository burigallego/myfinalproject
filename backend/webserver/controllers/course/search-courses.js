'use strict';

const mysqlPool = require('../../../databases/mysql-pool');

async function searchCourses(req, res, next) {

    const { q } = req.query;

    const coursesQuery = `SELECT * FROM courses WHERE MATCH(title, description, creator_name)
    AGAINST('${q}*' in BOOLEAN MODE)`;

    try {
        const connection = await mysqlPool.getConnection();
        const [result] = await connection.query(coursesQuery);
        connection.release();
        return res.send(result);
    } catch (e) {
        next(e);
    }
}

module.exports = searchCourses;