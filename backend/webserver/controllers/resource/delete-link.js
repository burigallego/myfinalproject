'use strict';

const mysqlPool = require('../../../databases/mysql-pool');


async function deleteLinkFromDatabase(resourceId) {
    const connection = await mysqlPool.getConnection();
    const deleteLinkQuery = `DELETE FROM resources WHERE resource_id = '${resourceId}'`;

    await connection.query(deleteLinkQuery);

    connection.release();

    return resourceId;
}

async function deleteLink(req, res, next) {
    const linkData = req.query;
    const { role } = req.claims;


    const { resourceId, courseId } = linkData;

    try {
        if (role !== 'admin') {
            return res.status(403).send();
        }



        const connection = await mysqlPool.getConnection();

        const deleteQuery = `DELETE FROM courses_resources WHERE resource_id = '${resourceId}' AND course_id = '${courseId}'`;
        await connection.query(deleteQuery);
        connection.release();
        await deleteLinkFromDatabase(resourceId);
        return res.status(204).send();

    } catch (e) {
        // create error
        next(e);
    }

}

module.exports = deleteLink;

