"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
async function connectDB(url, options) {
    await mongoose_1.default.connect(url, options).then(() => {
        console.log("Mongo DB Conneted");
    });
    // Log an error if we fail to connect
    mongoose_1.default.connection.on("error", (err) => {
        console.error(err);
        console.log(`  
       Mongo DB Host not found!
       please add DB_HOST environment variable to .env file
       exiting...
      `);
        process.exit(1);
    });
}
exports.connectDB = connectDB;
