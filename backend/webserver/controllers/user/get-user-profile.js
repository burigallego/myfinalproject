'use strict'

const mysqlPool = require('../../../databases/mysql-pool');

async function getUserProfile(req, res, next) {
    const { uuid } = req.claims;
    const profileQuery = `SELECT uuid, role, full_name, address, tlf, avatar_url FROM users WHERE uuid='${uuid}'`;

    try {
        const connection = await mysqlPool.getConnection();
        const [profileQueryRes] = await connection.query(profileQuery);
        const [result] = profileQueryRes;
        const profileData = {
            uuid: result.uuid,
            role: result.role,
            fullName: result.full_name,
            address: result.address,
            tlf: result.tlf,
            avatarUrl: result.avatar_url,
        };
        connection.release();
        return res.status(200).send(profileData);
    } catch (e) {
        return res.status(500).send(e.message);
    }


}

module.exports = getUserProfile;
