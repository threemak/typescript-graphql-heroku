import mongoose from "mongoose";
mongoose.Promise = global.Promise;

export async function connectDB(url: string, options: Object): Promise<any> {
  await mongoose.connect(url, options).then(() => {
    console.log("Mongo DB Conneted");
  });
  // Log an error if we fail to connect
  mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log(
      `  
       Mongo DB Host not found!
       please add DB_HOST environment variable to .env file
       exiting...
      `
    );
    process.exit(1);
  });
}
