"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const post_resolver_1 = require("./post.resolver");
const user_resolver_1 = __importDefault(require("./user.resolver"));
exports.resolvers = [user_resolver_1.default, post_resolver_1.PostResolver];
