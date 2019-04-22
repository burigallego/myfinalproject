'use strict';

const cloudinary = require('cloudinary');
const mysqlPool = require('../../../databases/mysql-pool');
const cloudName = process.env.CLOUDINARI_CLOUD_NAME;
const apiKey = process.env.CLOUDINARI_API_KEY;
const apiSecret = process.env.CLOUDINARI_API_SECRET;

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
});


async function deleteFileFromDatabase(resourceId) {
    const connection = await mysqlPool.getConnection();
    const deleteLinkQuery = `DELETE FROM resources WHERE resource_id = '${resourceId}'`;

    await connection.query(deleteLinkQuery);

    connection.release();

    return resourceId;
}

async function deleteFile(req, res, next) {
    const { resourceId, courseId, publicId } = req.query;
    const { role } = req.claims;


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

