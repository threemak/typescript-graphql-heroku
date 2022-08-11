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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const graphql_upload_1 = require("graphql-upload");
const mongoose_1 = require("mongoose");
const type_graphql_1 = require("type-graphql");
const post_schema_1 = require("../schema/post.schema");
const post_service_1 = __importDefault(require("../service/post.service"));
let PostResolver = class PostResolver {
    constructor(postService) {
        this.postService = postService;
        this.postService = new post_service_1.default();
    }
    async post(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new apollo_server_core_1.ApolloError("Post id is required");
        }
        return post_schema_1.PostModel.findById(id).populate("user");
    }
    async posts() {
        return post_schema_1.PostModel.find().populate("user");
    }
    async createTextPost(input, context) {
        const user = context.user;
        return this.postService.createTextPost({ ...input, user: user === null || user === void 0 ? void 0 : user.id }, context);
    }
    async createImagePost(title, image, published, context) {
        return this.postService.createImagePost(title, image, published, context);
    }
    async createVideoPost(title, video, published, context) {
        return this.postService.createVideoPost(title, video, published, context);
    }
    async createAudioPost(title, audio, published, context) {
        return this.postService.createAudioPost(title, audio, published, context);
    }
    async createLinkPost(title, link, published, context) {
        return this.postService.createLinkPost(title, link, published, context);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => post_schema_1.Post),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    (0, type_graphql_1.Query)(() => [post_schema_1.Post]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => post_schema_1.Post),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_schema_1.CreateTextPost, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createTextPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => post_schema_1.Post),
    __param(0, (0, type_graphql_1.Arg)("title")),
    __param(1, (0, type_graphql_1.Arg)("image", () => [graphql_upload_1.GraphQLUpload])),
    __param(2, (0, type_graphql_1.Arg)("published")),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Boolean, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createImagePost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => post_schema_1.Post),
    __param(0, (0, type_graphql_1.Arg)("title")),
    __param(1, (0, type_graphql_1.Arg)("video", () => graphql_upload_1.GraphQLUpload)),
    __param(2, (0, type_graphql_1.Arg)("published")),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Boolean, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createVideoPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => post_schema_1.Post),
    __param(0, (0, type_graphql_1.Arg)("title")),
    __param(1, (0, type_graphql_1.Arg)("audio", () => graphql_upload_1.GraphQLUpload)),
    __param(2, (0, type_graphql_1.Arg)("published")),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Boolean, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createAudioPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => post_schema_1.Post),
    __param(0, (0, type_graphql_1.Arg)("title")),
    __param(1, (0, type_graphql_1.Arg)("link")),
    __param(2, (0, type_graphql_1.Arg)("published")),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createLinkPost", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [post_service_1.default])
], PostResolver);
exports.PostResolver = PostResolver;
