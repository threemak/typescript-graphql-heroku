"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserObject = exports.LoginUserInput = exports.CreateUserInput = exports.UserModel = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const post_schema_1 = require("./post.schema");
function findByEmail(email) {
    return this.find({ email });
}
let User = User_1 = class User {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({
        required: true,
        default: function () {
            const hash = crypto_1.default.createHash("md5").update(this.email).digest("hex");
            return `https://www.gravatar.com/avatar/${hash}.jpg?s=400&r=g&d=robohash`;
        },
    }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.prop)({ type: String, default: null }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typegoose_1.prop)({ type: Boolean, default: false, required: true }),
    __metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [User_1], { nullable: true }),
    (0, typegoose_1.prop)({ ref: User_1, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [User_1], { nullable: true }),
    (0, typegoose_1.prop)({ ref: User_1, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [post_schema_1.Post], { nullable: true }),
    (0, typegoose_1.prop)({ ref: "Post", default: [] }),
    __metadata("design:type", Array)
], User.prototype, "post", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ default: () => Date.now() }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ default: () => Date.now() }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = User_1 = __decorate([
    (0, typegoose_1.pre)("save", async function () {
        if (!this.isModified("password"))
            return;
        this.password = await bcrypt_1.default.hash(this.password, 10);
    }),
    (0, typegoose_1.index)({ email: 1 }),
    (0, typegoose_1.queryMethod)(findByEmail),
    (0, typegoose_1.modelOptions)({
        schemaOptions: { timestamps: true, collection: "user" },
    }),
    (0, type_graphql_1.ObjectType)()
], User);
exports.User = User;
exports.UserModel = (0, typegoose_1.getModelForClass)(User);
let CreateUserInput = class CreateUserInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, type_graphql_1.Field)(() => String, {
        description: "Email address of the user",
    }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6, {
        message: "Password must be at least 6 characters long",
    }),
    (0, class_validator_1.MaxLength)(20, {
        message: "Password must be at most 20 characters long",
    }),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
CreateUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;
let LoginUserInput = class LoginUserInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], LoginUserInput.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, type_graphql_1.Field)(() => String, {
        description: "Email address of the user",
        nullable: true,
    }),
    __metadata("design:type", String)
], LoginUserInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6, {
        message: "Password must be at least 6 characters long",
    }),
    (0, class_validator_1.MaxLength)(20, {
        message: "Password must be at most 20 characters long",
    }),
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoginUserInput.prototype, "password", void 0);
LoginUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], LoginUserInput);
exports.LoginUserInput = LoginUserInput;
let UserObject = class UserObject {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UserObject.prototype, "token", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User),
    __metadata("design:type", User)
], UserObject.prototype, "user", void 0);
UserObject = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserObject);
exports.UserObject = UserObject;
