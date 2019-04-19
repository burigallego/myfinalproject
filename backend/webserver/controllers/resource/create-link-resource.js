'use strict';

const Joi = require('joi');
const mysqlPool = require('../../../databases/mysql-pool');

async function validate(payload) {
    const schema = {
        url: Joi.string().uri(),
        courseId: Joi.number().integer().positive().allow(0),
        resourceName: Joi.string()
    };

    return Joi.validate(payload, schema);
}

async function insertLink(url, resourceName) {
    const now = new Date();
    const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');
    const type = 0;
    const connection = await mysqlPool.getConnection();

    await connection.query('INSERT INTO resources SET ?', {
        url,
        created_at: createdAt,
        type,
        resource_name: resourceName,
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

    const { url, resourceName, courseId } = linkData;

    try {
        if (role !== 'admin') {
            return res.status(403).send();
        }

        await insertLink(url, resourceName);

        const connection = await mysqlPool.getConnection();

        const resourcesQuery = `SELECT * FROM resources WHERE url = '${url}'`;
        const [resourceResult] = await connection.query(resourcesQuery);
        const [{ resource_id: resourceId }] = resourceResult;
        const [resource] = resourceResult;
        await connection.query('INSERT INTO courses_resources SET ?', {
            course_id: courseId,
            resource_id: resourceId,
        });
        connection.release();
        return res.status(200).send(resource);

    } catch (e) {
        // create error
        next(e);
    }

}

module.exports = createLinkResource;