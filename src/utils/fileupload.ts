import {
  UploadApiErrorResponse,
  UploadApiResponse,
  UploadStream,
  v2,
} from "cloudinary";
import { FileUpload } from "graphql-upload";

export async function uploadPhoto(
  photo: FileUpload[],
  userID: string
): Promise<string[][]> {
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return await Promise.all<Promise<string[]>[]>(
    photo.map(async (photo) => {
      const { createReadStream } = await photo;
      return new Promise<string[]>((resolve, reject) => {
        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
        const stream = createReadStream();
        // create a new file with filename, mimetype and encoding
        const upload: UploadStream = v2.uploader.upload_stream(
          {
            async: true,
            resource_type: "image",
            public_id: `Social60Backend/${userID}/${Date.now()}`,
          },
          (err?: UploadApiErrorResponse, result?: UploadApiResponse) =>
            err
              ? reject(err)
              : result === undefined
              ? null
              : resolve([result.secure_url, result.public_id])
        );
        // pipe the file to cloudinary
        stream.pipe(upload);
        upload.on("error", (error) => {
          console.log(error);
        });
        upload.on("finish", () => {
          console.log("finish");
        });
      });
    })
  );
}

export async function uploadAudioORVideo(
  file: FileUpload,
  userID: string,
  resource: string
): Promise<string[]> {
  const { createReadStream } = await file;
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return new Promise<string[]>((resolve, reject) => {
    // Invoking the `createReadStream` will return a Readable Stream.
    // See https://nodejs.org/api/stream.html#stream_readable_streams
    const stream = createReadStream();
    // create a new file with filename, mimetype and encoding
    const upload: UploadStream = v2.uploader.upload_chunked_stream(
      {
        chunk_size: 6000000, // 6MB
        resource_type: resource,
        public_id: `Social60Backend/${userID}/${Date.now()}`,
      },
      (err?: UploadApiErrorResponse, result?: UploadApiResponse) =>
        err
          ? reject(err)
          : result === undefined
          ? null
          : resolve([result.secure_url, result.public_id])
    );
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
