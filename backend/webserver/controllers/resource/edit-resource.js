'use strict';

const Joi = require('joi');
const mysqlPool = require('../../../databases/mysql-pool');

async function validate(payload) {
    const schema = {
        resourceName: Joi.string().allow(null),
        resourceId: Joi.number().integer().positive().allow(0),
    };

    return Joi.validate(payload, schema);
}

async function updateResourceIntoDatabase(resourceName, resourceId) {


    const sqlUpdateQuery = `UPDATE resources
    SET  resource_name = '${resourceName}'
    WHERE resource_id='${resourceId}'`;

    try {
        const connection = await mysqlPool.getConnection();
        const resultUpdate = await connection.query(sqlUpdateQuery);
        connection.release();

    } catch (e) {
        console.log(e);
    }

    return resourceId;
}

async function editResource(req, res, next) {
    const resourceUpdateProfile = { ...req.body };
    const { resourceId } = req.query;
    const { uuid, role } = req.claims;
    resourceUpdateProfile.resourceId = resourceId;

    /**
     * 1. validator datos
     */
    try {
        await validate(resourceUpdateProfile);

    } catch (e) {
        return res.status(400).send(e);
    }
    const {
        resourceName
    } = resourceUpdateProfile;

    try {
        /**
         * Create the user and send response
         */
        if (role != 'admin') {
            res.status(403).send('Unauthorized user');
        }

        await updateResourceIntoDatabase(resourceName, resourceId);

        res.status(204).json();


    } catch (e) {
        console.error(e);
        res.status(500).json();
    }



}

module.exports = editResource;
