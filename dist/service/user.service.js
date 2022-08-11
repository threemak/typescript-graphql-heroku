"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const user_schema_1 = require("../schema/user.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
class UserService {
    async signup(input, ctx) {
        // check if username is exist
        const username = await user_schema_1.UserModel.findOne({ username: input.username });
        if (username) {
            throw new apollo_server_core_1.AuthenticationError("Username is exist.Try another one");
        }
        const email = await user_schema_1.UserModel.findOne({ email: input.email });
        if (email) {
            throw new apollo_server_core_1.AuthenticationError("Email is exist.Try another one");
        }
        const user = await user_schema_1.UserModel.create(input);
        const id = user.id;
        // generate JWT from user
        const token = (0, jwt_1.signJWT)({ id });
        return {
            token,
            user,
        };
    }
    async signin(input, ctx) {
        if (input.email) {
            input.email.trim().toLowerCase();
        }
        // find the user by username and email
        const user = await user_schema_1.UserModel.findOne({
            $or: [{ username: input.username }, { email: input.email }],
        });
        if (!user) {
            throw new apollo_server_core_1.AuthenticationError("Username or email is not exist");
        }
        // if the passwords don't match, throw an authentication error
        const valid = await bcrypt_1.default.compare(input.password, user.password);
        if (!valid) {
            throw new apollo_server_core_1.AuthenticationError("Password is incorrect");
        }
        // generate JWT from user
        const id = user.id;
        const token = (0, jwt_1.signJWT)({ id });
        return {
            token,
            user,
        };
    }
}
exports.default = UserService;
