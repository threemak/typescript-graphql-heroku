"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authChecker = ({ context }) => {
    console.log(context.user);
    return !!context.user;
};
exports.default = authChecker;
