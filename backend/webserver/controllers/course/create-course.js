'use strict';

const Joi = require('joi');
const mysqlPool = require('../../../databases/mysql-pool');

async function validate(payload) {
    const schema = {
        title: Joi.string().min(3).max(128).required(),
    };

    return Joi.validate(payload, schema);
}

async function insertCourse(title, uuid) {
    const now = new Date();
    const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');

    const connection = await mysqlPool.getConnection();

    await connection.query('INSERT INTO courses SET ?', {
        title,
        created_at: createdAt,
        creator: uuid
    });
    connection.release();
    return title;
}

async function createCourse(req, res, next) {
    const courseData = { ...req.body };
    const { claims } = req;
    const { uuid, role } = claims;

    try {
        await validate(courseData);

    } catch (e) {
        return res.status(400).send(e);
    }

    const { title } = courseData;

    try {
        if (role !== 'admin') {
            return res.status(403).send();
        }

        await insertCourse(title, uuid);

        const connection = await mysqlPool.getConnection();

        const usersQuery = `SELECT id FROM users WHERE uuid = '${uuid}'`;
        const coursesQuery = `SELECT course_id FROM courses WHERE title = '${title}'`;
        const [userResult] = await connection.query(usersQuery);
        const [courseResult] = await connection.query(coursesQuery);
        const [{ id: userId }] = userResult;
        const [{ course_id: courseId }] = courseResult;
        await connection.query('INSERT INTO users_courses SET ?', {
            user_id: userId,
            course_id: courseId,
        });
        connection.release();
        return res.status(204).json();

    } catch (e) {
        // create error
        next(e);
    }

}

module.exports = createCourse;