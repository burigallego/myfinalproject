'use strict'

const mysqlPool = require('../../../databases/mysql-pool');

async function getUserProfile(req, res, next) {
    const { uuid } = req.claims;
    const profileQuery = `SELECT uuid, role, full_name, address, tlf, avatar_url FROM users WHERE uuid='${uuid}'`;
    const yourCoursesQuery = `SELECT c.course_id, c.creator 
    FROM courses c
    INNER JOIN users_courses uc ON uc.course_id = c.course_id 
    INNER JOIN users u ON u.id = uc.user_id
    WHERE uuid = '${uuid}'`;
    try {
        const connection = await mysqlPool.getConnection();
        const [profileQueryRes] = await connection.query(profileQuery);
        const [yourCourses] = await connection.query(yourCoursesQuery);
        const [result] = profileQueryRes;
        const profileData = {
            uuid: result.uuid,
            role: result.role,
            fullName: result.full_name,
            address: result.address,
            tlf: result.tlf,
            avatarUrl: result.avatar_url,
            yourCourses,
        };
        return res.status(200).send(profileData);
    } catch (e) {
        return res.status(500).send(e.message);
    }


}

module.exports = getUserProfile;
