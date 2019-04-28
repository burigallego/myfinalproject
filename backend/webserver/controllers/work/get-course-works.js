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

    const { role } = req.claims;
    const { courseId } = req.query;

    if (role !== 'admin') {
        return res.status(403).send();
    }
    const fileQuery = `SELECT course_id FROM works where course_id = '${courseId}'`;

    try {
        const connection = await mysqlPool.getConnection();
        const [result] = await connection.query(fileQuery);
        if (result.length == 0) {
            return res.send('No files');
        }
        const url = cloudinary.v2.utils.download_zip_url(
            { tags: courseId });
        res.header('Location', url);
        return res.send();
    } catch (e) {
        next(e);
    }
}

module.exports = getCourseResources;
