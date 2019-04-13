'use strict';

const Joi = require('joi');
const mysqlPool = require('../../../databases/mysql-pool');

async function validate(payload) {
    const schema = {
        url: Joi.string().uri(),
        courseId: Joi.number().integer().positive().allow(0),
    };

    return Joi.validate(payload, schema);
}

async function insertLink(url) {
    const now = new Date();
    const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');
    const type = 0;
    const connection = await mysqlPool.getConnection();

    await connection.query('INSERT INTO resources SET ?', {
        url,
        created_at: createdAt,
        type
    });
    connection.release();
    return url;
}

async function createLinkResource(req, res, next) {
    const linkData = { ...req.body };
    const { claims } = req;
    const { role } = claims;
    linkData.courseId = req.query.courseId;

    try {
        await validate(linkData);

    } catch (e) {
        return res.status(400).send(e);
    }

    const { url, courseId } = linkData;

    try {
        if (role !== 'admin') {
            return res.status(403).send();
        }

        await insertLink(url);

        const connection = await mysqlPool.getConnection();

        const resourcesQuery = `SELECT resource_id FROM resources WHERE url = '${url}'`;
        const [resourceResult] = await connection.query(resourcesQuery);
        const [{ resource_id: resourceId }] = resourceResult;
        await connection.query('INSERT INTO courses_resources SET ?', {
            course_id: courseId,
            resource_id: resourceId,
        });
        connection.release();
        return res.status(204).json();

    } catch (e) {
        // create error
        next(e);
    }

}

module.exports = createLinkResource;