'use strict';

const mysqlPool = require('../../../databases/mysql-pool');

async function getCourses(req, res, next) {
    const coursesQuery = `SELECT * FROM courses`;

    try {
        const connection = await mysqlPool.getConnection();
        const [result] = await connection.query(coursesQuery);
        connection.release();
        return res.send(result);
    } catch (e) {
        next(e);
    }
}

module.exports = getCourses;