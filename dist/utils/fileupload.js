"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAudioORVideo = exports.uploadPhoto = void 0;
const cloudinary_1 = require("cloudinary");
async function uploadPhoto(photo, userID) {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });
    return await Promise.all(photo.map(async (photo) => {
        const { createReadStream } = await photo;
        return new Promise((resolve, reject) => {
            // Invoking the `createReadStream` will return a Readable Stream.
            // See https://nodejs.org/api/stream.html#stream_readable_streams
            const stream = createReadStream();
            // create a new file with filename, mimetype and encoding
            const upload = cloudinary_1.v2.uploader.upload_stream({
                async: true,
                resource_type: "image",
                public_id: `Social60Backend/${userID}/${Date.now()}`,
            }, (err, result) => err
                ? reject(err)
                : result === undefined
                    ? null
                    : resolve([result.secure_url, result.public_id]));
            // pipe the file to cloudinary
            stream.pipe(upload);
            upload.on("error", (error) => {
                console.log(error);
            });
            upload.on("finish", () => {
                console.log("finish");
            });
        });
    }));
}
exports.uploadPhoto = uploadPhoto;
async function uploadAudioORVideo(file, userID, resource) {
    const { createReadStream } = await file;
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });
    return new Promise((resolve, reject) => {
        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
        const stream = createReadStream();
        // create a new file with filename, mimetype and encoding
        const upload = cloudinary_1.v2.uploader.upload_chunked_stream({
            chunk_size: 6000000,
            resource_type: resource,
            public_id: `Social60Backend/${userID}/${Date.now()}`,
        }, (err, result) => err
            ? reject(err)
            : result === undefined
                ? null
                : resolve([result.secure_url, result.public_id]));
        // pipe the file to cloudinary
        stream.pipe(upload);
        upload.on("error", (error) => {
            console.log(error);
        });
        upload.on("finish", () => {
            console.log("finish");
        });
    });
}
exports.uploadAudioORVideo = uploadAudioORVideo;
