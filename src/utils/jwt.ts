import { sign, SignOptions, verify } from "jsonwebtoken";

const privateKey = Buffer.from(
  process.env.PRIVATE_KEY as string,
  "base64"
).toString("ascii");

const publicKey = Buffer.from(
  process.env.PUBLIC_KEY as string,
  "base64"
).toString("ascii");

export function signJWT(object: Object, options?: SignOptions | undefined) {
  return sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
    subject: "user",
  });
}

export function verifyJWT<T>(token: string): T | null {
  try {
    const decoded = verify(token, publicKey) as T;
    return decoded;
  } catch (error) {
    return null;
  }
}
