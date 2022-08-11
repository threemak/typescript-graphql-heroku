"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const privateKey = Buffer.from(process.env.PRIVATE_KEY, "base64").toString("ascii");
const publicKey = Buffer.from(process.env.PUBLIC_KEY, "base64").toString("ascii");
function signJWT(object, options) {
    return (0, jsonwebtoken_1.sign)(object, privateKey, {
        ...(options && options),
        algorithm: "RS256",
        subject: "user",
    });
}
exports.signJWT = signJWT;
function verifyJWT(token) {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, publicKey);
        return decoded;
    }
    catch (error) {
        return null;
    }
}
exports.verifyJWT = verifyJWT;
