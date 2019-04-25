'use strict';

const mysqlPool = require('../../../databases/mysql-pool');

async function getCourseResources(req, res, next) {

    const { uuid } = req.claims;
    const { courseId } = req.query;

    const resourcesQuery = `SELECT  r.url, r.type, r.created_at, r.resource_id, r.resource_name, r.file_name
    FROM resources r
    INNER JOIN courses_resources cr ON cr.resource_id = r.resource_id 
    INNER JOIN courses c ON c.course_id = cr.course_id
    WHERE c.course_id = '${courseId}'`;

    try {
        const connection = await mysqlPool.getConnection();
        const [result] = await connection.query(resourcesQuery);
        connection.release();
        return res.send(result);
    } catch (e) {
        next(e);
    }
}

module.exports = getCourseResources;