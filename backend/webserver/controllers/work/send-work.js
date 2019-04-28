'use strict';

const cloudinary = require('cloudinary');
const mysqlPool = require('../../../databases/mysql-pool');
const cloudName = process.env.CLOUDINARI_CLOUD_NAME;
const apiKey = process.env.CLOUDINARI_API_KEY;
const apiSecret = process.env.CLOUDINARI_API_SECRET;
const uuidv4 = require('uuid/v4');
const Joi = require('joi');

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
});

async function validate(payload) {
    const schema = {
        courseId: Joi.number().integer().positive().allow(0)
    }
    return Joi.validate(payload, schema);
};
async function sendFile(req, res, next) {
    const fileData = req.query;
    const { file } = req;
    const { uuid } = req.claims;
    try {

        await validate(fileData);

    } catch (e) {
        return res.status(400).send(e.message);
    }

    const { courseId } = fileData;


    if (!file.buffer) {
        return res.status(400).send();
    }

    // necesito la imagen que suben desde postman/ browser / whatever
    const publicId = uuidv4();
    // subir foto a cloudinary
    cloudinary.v2.uploader.upload_stream({
        resource_type: 'auto',
        public_id: publicId,
        folder: `works${courseId}`,
        tags: courseId
    }, async (err, result) => {
        if (err) {
            console.error('hubo error', err);
            return res.status(400).send(err);
        }

        const {
            etag,
            secure_url: secureUrl,
        } = result;

        // actualizar perfil de usuario con la foto de cloudinary

        const connection = await mysqlPool.getConnection();
        const now = new Date();
        const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');


        try {

            await connection.query('INSERT INTO works SET ?', {
                url: secureUrl,
                created_at: createdAt,
                public_id: publicId,
                course_id: courseId,
                uuid,
            });

            connection.release();

            // devolve el 204 y el header location con la url de la foto
            res.header('Location', secureUrl);
            return res.status(204).send();
        } catch (e) {
            console.log(e);
            return res.status(500).send(err.message);
        }

        // console.log(result);
    }).end(file.buffer);
}


module.exports = sendFile;