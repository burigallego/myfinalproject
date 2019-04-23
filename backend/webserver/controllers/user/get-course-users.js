'use strict';

const mysqlPool = require('../../../databases/mysql-pool');


async function getCourseUsers(req, res, next) {
    const { uuid } = req.claims;
    const { courseId } = req.query;

    const courseUsersQuery = `SELECT *
    FROM users u
    INNER JOIN users_courses uc ON uc.user_id = u.id 
    INNER JOIN courses c ON c.course_id = uc.course_id
    WHERE c.course_id = '${courseId}'`;
    const yourCoursesQuery = `SELECT c.course_id, c.creator 
    FROM courses c
    INNER JOIN users_courses uc ON uc.course_id = c.course_id 
    INNER JOIN users u ON u.id = uc.user_id
    WHERE uuid = '${uuid}'`;
    try {
        const connection = await mysqlPool.getConnection();
        const [courseUsersQueryRes] = await connection.query(courseUsersQuery);
        const [yourCourses] = await connection.query(yourCoursesQuery);
        const [result] = courseUsersQueryRes;
        const userData = {
            uuid: result.uuid,
            role: result.role,
            full_name: result.full_name,
            address: result.address,
            tlf: result.tlf,
            avatarUrl: result.avatar_url,
            yourCourses,
        };
        connection.release();
        return res.status(200).send(userData);
    } catch (e) {
        return res.status(500).send(e.message);
    }


}

module.exports = getCourseUsers;