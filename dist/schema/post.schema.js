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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateImagePost = exports.CreateTextPost = exports.PostModel = exports.Post = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const graphql_upload_1 = require("graphql-upload");
const mongoose_1 = __importDefault(require("mongoose"));
const type_graphql_1 = require("type-graphql");
const post_enum_1 = require("../enum/post.enum");
const user_schema_1 = require("./user.schema");
function findByPostItemType(postItemType) {
    return this.find({ postItemType });
}
let Post = class Post {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], Post.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typegoose_1.prop)({ required: true, minlength: 8, maxlength: 150 }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => post_enum_1.PostItemType, {
        defaultValue: post_enum_1.PostItemType.TEXT,
    }),
    (0, typegoose_1.prop)({
        type: String,
        required: true,
        enum: post_enum_1.PostItemType,
        default: post_enum_1.PostItemType.TEXT,
    }),
    __metadata("design:type", String)
], Post.prototype, "postItemType", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.prop)({ type: String, default: null }),
    __metadata("design:type", String)
], Post.prototype, "text", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typegoose_1.prop)({ type: [String], default: null }),
    __metadata("design:type", Array)
], Post.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.prop)({ type: String, default: null }),
    __metadata("design:type", String)
], Post.prototype, "video", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.prop)({ type: String, default: null }),
    __metadata("design:type", String)
], Post.prototype, "audio", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typegoose_1.prop)({ type: String, default: null }),
    __metadata("design:type", String)
], Post.prototype, "link", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "likes", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "shares", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typegoose_1.prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Post.prototype, "published", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_schema_1.User),
    (0, typegoose_1.prop)({ ref: user_schema_1.User, required: true }),
    __metadata("design:type", Object)
], Post.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ default: () => Date.now() }),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ default: () => Date.now() }),
    __metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
Post = __decorate([
    (0, typegoose_1.index)({ postItemType: 1 }),
    (0, typegoose_1.modelOptions)({
        schemaOptions: { timestamps: true, collection: "post" },
    }),
    (0, type_graphql_1.ObjectType)()
], Post);
exports.Post = Post;
exports.PostModel = (0, typegoose_1.getModelForClass)(Post);
let CreateTextPost = class CreateTextPost {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateTextPost.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateTextPost.prototype, "text", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], CreateTextPost.prototype, "published", void 0);
CreateTextPost = __decorate([
    (0, type_graphql_1.InputType)()
], CreateTextPost);
exports.CreateTextPost = CreateTextPost;
let CreateImagePost = class CreateImagePost {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateImagePost.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [graphql_upload_1.GraphQLUpload]),
    __metadata("design:type", Array)
], CreateImagePost.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], CreateImagePost.prototype, "published", void 0);
CreateImagePost = __decorate([
    (0, type_graphql_1.InputType)()
], CreateImagePost);
exports.CreateImagePost = CreateImagePost;
