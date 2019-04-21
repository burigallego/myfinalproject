'use strict';

const mysqlPool = require('../../../databases/mysql-pool');


async function deleteFileFromDatabase(resourceId) {
    const connection = await mysqlPool.getConnection();
    const deleteLinkQuery = `DELETE FROM resources WHERE resource_id = '${resourceId}'`;

    await connection.query(deleteLinkQuery)

    return resourceId;
}

async function deleteFile(req, res, next) {
    const { resourceId, courseId } = req.query;
    const { role } = req.claims;
    const { publicId } = req.body;

    try {
        if (role !== 'admin') {
            return res.status(403).send();
        }



        const connection = await mysqlPool.getConnection();

        const deleteQuery = `DELETE FROM courses_resources WHERE resource_id = '${resourceId}' AND course_id = '${courseId}'`;
        await connection.query(deleteQuery);
        connection.release();
        await deleteFileFromDatabase(resourceId);
        cloudinary.v2.uploader.destroy(publicId, async (err, result) => {
            if (err) {
                console.error('hubo error', err);
                return res.status(400).send(err);
            }
        });
        return res.status(204).send();

    } catch (e) {
        // create error
        next(e);
    }

}

module.exports = deleteFile;

