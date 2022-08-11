"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const mongoose_1 = require("mongoose");
const post_enum_1 = require("../enum/post.enum");
const post_schema_1 = require("../schema/post.schema");
const user_schema_1 = require("../schema/user.schema");
const fileupload_1 = require("../utils/fileupload");
class PostService {
    constructor() { }
    async createTextPost(input, context) {
        const user = context.user;
        if (!user) {
            throw new apollo_server_core_1.AuthenticationError("You must be logged in to create a text post");
        }
        const post = await post_schema_1.PostModel.create(input);
        await user_schema_1.UserModel.findByIdAndUpdate(user.id, { $push: { post: new mongoose_1.Types.ObjectId(post._id) } }, { new: true });
        return post.populate("user");
    }
    async createImagePost(title, image, published, context) {
        const user = context.user;
        if (!user) {
            throw new apollo_server_core_1.AuthenticationError("You must be logged in to create a image post");
        }
        if (image.length > 8) {
            throw new apollo_server_core_1.ApolloError("You can only upload 8 image");
        }
        const url = await (0, fileupload_1.uploadPhoto)(image, user === null || user === void 0 ? void 0 : user.id.toString()).then((url) => url);
        const arrayUrl = url.map((url) => url[0]);
        const post = await post_schema_1.PostModel.create({
            title,
            postItemType: post_enum_1.PostItemType.IMAGE,
            image: arrayUrl,
            published: published,
            user: user.id,
        });
        await user_schema_1.UserModel.findByIdAndUpdate(user.id, { $push: { post: new mongoose_1.Types.ObjectId(post._id) } }, { new: true });
        return post.populate("user");
    }
    async createVideoPost(title, video, published, context) {
        const user = context.user;
        if (!user) {
            throw new apollo_server_core_1.AuthenticationError("You must be logged in to create a video post");
        }
        const videoUrl = await (0, fileupload_1.uploadAudioORVideo)(video, user === null || user === void 0 ? void 0 : user.id.toString(), "video").then((url) => url);
        console.log(videoUrl);
        const post = await post_schema_1.PostModel.create({
            title,
            postItemType: post_enum_1.PostItemType.VIDEO,
            video: videoUrl[0],
            published: published,
            user: user.id,
        });
        await user_schema_1.UserModel.findByIdAndUpdate(user.id, { $push: { post: new mongoose_1.Types.ObjectId(post._id) } }, { new: true });
        return post.populate("user");
    }
    async createAudioPost(title, audio, published, context) {
        const user = context.user;
        if (!user) {
            throw new apollo_server_core_1.AuthenticationError("You must be logged in to create a audio post");
        }
        const audioUrl = await (0, fileupload_1.uploadAudioORVideo)(audio, user.id.toString(), "video").then((url) => url);
        console.log(audioUrl);
        const post = await post_schema_1.PostModel.create({
            title,
            postItemType: post_enum_1.PostItemType.AUDIO,
            audio: audioUrl[0],
            published: published,
            user: user.id,
        });
        await user_schema_1.UserModel.findByIdAndUpdate(user.id, { $push: { post: new mongoose_1.Types.ObjectId(post._id) } }, { new: true });
        return post.populate("user");
    }
    async createLinkPost(title, link, published, context) {
        const user = context.user;
        if (!user) {
            throw new apollo_server_core_1.AuthenticationError("You must be logged in to create a link post");
        }
        const post = await post_schema_1.PostModel.create({
            title,
            postItemType: post_enum_1.PostItemType.LINK,
            link: link,
            published: published,
            user: user.id,
        });
        await user_schema_1.UserModel.findByIdAndUpdate(user.id, { $push: { post: new mongoose_1.Types.ObjectId(post._id) } }, { new: true });
        return post.populate("user");
    }
}
exports.default = PostService;
