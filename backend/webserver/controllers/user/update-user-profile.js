'use strict';

const Joi = require('joi');
const mysqlPool = require('../../../databases/mysql-pool');


async function validate(payload) {
    const schema = {
        fullName: Joi.string().min(3).max(128).required(),
        address: Joi.string().allow(null),
        tlf: Joi.string().allow(null),
    };

    return Joi.validate(payload, schema);
}

async function updateUserIntoDatabase(fullName, address, tlf, uuid) {


    const connection = await mysqlPool.getConnection();
    const sqlUpdateQuery = `UPDATE users
    SET full_name = '${fullName}', address = '${address}', tlf = '${tlf}'
    WHERE uuid='${uuid}'`;
    const creatorNameQuery = `UPDATE courses c
    JOIN users_courses uc
    ON c.course_id = uc.course_id
    JOIN users u
    ON uc.user_id = u.id
    AND creator = '${uuid}'
    SET c.creator_name = u.full_name`;
    try {
        const connection = await mysqlPool.getConnection();
        const resultUpdate = await connection.query(sqlUpdateQuery);
        const resultCreator = await connection.query(creatorNameQuery);
        connection.release();

    } catch (e) {
        console.log(e);
    }

    return uuid;
}


async function updateUserProfile(req, res, next) {
    const userDataProfile = { ...req.body };
    const { claims } = req;
    /**
     * 1. validator datos
     */
    try {
        await validate(userDataProfile);

    } catch (e) {
        return res.status(400).send(e);
    }
    const {
        fullName,
        address,
        tlf
    } = userDataProfile;

    try {
        /**
         * Create the user and send response
         */
        const uuid = await updateUserIntoDatabase(fullName, address, tlf, claims.uuid);

        res.status(204).json();


    } catch (e) {
        // create error
        res.status(500).json();
    }



}

module.exports = updateUserProfile;
