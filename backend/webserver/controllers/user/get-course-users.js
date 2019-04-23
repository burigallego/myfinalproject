'use strict';

const mysqlPool = require('../../../databases/mysql-pool');


async function getCourseUsers(req, res, next) {
    const { uuid } = req.claims;
    const { courseId } = req.query;

    const courseUsersQuery = `SELECT u.full_name, u.uuid, u.address, u.tlf, u.avatar_url
    FROM users u
    INNER JOIN users_courses uc ON uc.user_id = u.id 
    INNER JOIN courses c ON c.course_id = uc.course_id
    WHERE c.course_id = '${courseId}'`;

    try {
        const connection = await mysqlPool.getConnection();
        const [courseUsersQueryRes] = await connection.query(courseUsersQuery);
        const users = courseUsersQueryRes.map(item => {
            return {
                uuid: item.uuid,
                fullName: item.full_name,
                address: item.address,
                tlf: item.tlf,
                avatarUrl: item.avatar_url,
            }
        });
        connection.release();
        return res.status(200).send(users);
    } catch (e) {
        return res.status(500).send(e.message);
    }


}

module.exports = getCourseUsers;