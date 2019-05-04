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

async function getCourseResources(req, res, next) {

    const { courseId } = req.query;
    const { uuid, role } = req.claims;

    if (role != 'admin') {
        return res.status(403).send();
    }
    try {

        const connection = await mysqlPool.getConnection();
        const noFileQuery = `SELECT work_id FROM works WHERE course_id = '${courseId}'`;
        const [result] = await connection.query(noFileQuery);
        if (result.length == 0) {
            connection.release();
            return res.status(412).send('No files');
        }
        connection.release();
        const url = cloudinary.v2.utils.download_zip_url({
            tags: courseId,
        });
        res.header('Location', url);

        return res.send();


    } catch (e) {
        next(e);
    }
}

module.exports = getCourseResources;
