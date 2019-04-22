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

async function deleteCourseFromDatabase(courseId) {
    const connection = await mysqlPool.getConnection();
    const deleteCourseQuery = `DELETE FROM courses WHERE course_id = '${courseId}'`;

    await connection.query(deleteCourseQuery)
    connection.release();
    return courseId;
}

async function deleteResourcesFromDatabase(resourceArr) {
    const connection = await mysqlPool.getConnection();

    const deleteResourcesQuery = `DELETE FROM resources WHERE resource_id IN ('${resourceArr.join("', '")}')`;
    if (resourceArr.length != 0) {
        await connection.query(deleteResourcesQuery);
        connection.release();
    }

    return resourceArr;
}

function chunkArray(myArray, chunkSize) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    if (myArray.length == 0) {
        return [];
    }
    if (myArray.length <= chunkSize) {
        tempArray.push(myArray);
        return tempArray;
    }
    for (index = 0; index < arrayLength; index += chunkSize) {
        myChunk = myArray.slice(index, index + chunkSize);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}
async function deleteCourse(req, res, next) {
    const { courseId } = req.query;
    const { role } = req.claims;


    try {
        if (role !== 'admin') {
            return res.status(403).send();
        }



        const connection = await mysqlPool.getConnection();
        const findResourcesCourseQuery = `SELECT  r.resource_id
        FROM resources r
        INNER JOIN courses_resources cr ON cr.resource_id = r.resource_id 
        INNER JOIN courses c ON c.course_id = cr.course_id
        WHERE c.course_id = '${courseId}'`;

        const findFilesCourseQuery = `SELECT  r.public_id
        FROM resources r
        INNER JOIN courses_resources cr ON cr.resource_id = r.resource_id 
        INNER JOIN courses c ON c.course_id = cr.course_id
        WHERE c.course_id = '${courseId}' AND r.type = 1`;


        const [resourceResult] = await connection.query(findResourcesCourseQuery);
        const resourceIdArr = resourceResult.map(item => {
            const resourceId = item.resource_id;
            return resourceId
        });

        const [fileResult] = await connection.query(findFilesCourseQuery);
        const publicIdArr = fileResult.map(item => {
            const publicId = item.public_id;
            return publicId
        });
        const deleteQuery = `DELETE FROM courses_resources WHERE course_id = '${courseId}'`;
        await connection.query(deleteQuery);
        connection.release();
        await deleteCourseFromDatabase(courseId);
        await deleteResourcesFromDatabase(resourceIdArr)
        const chunkresourceIdArray = chunkArray(publicIdArr, 100);
        for (const chunk of chunkresourceIdArray) {
            cloudinary.v2.api.delete_resources(chunk, async (err, result) => {
                if (err) {
                    console.error('hubo error', err);
                    return res.status(400).send(err);
                }
            });
        }

        return res.status(204).send();

    } catch (e) {
        // create error
        next(e);
    }

}

module.exports = deleteCourse;

