"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostItemType = void 0;
const type_graphql_1 = require("type-graphql");
var PostItemType;
(function (PostItemType) {
    PostItemType["TEXT"] = "TEXT";
    PostItemType["IMAGE"] = "IMAGE";
    PostItemType["VIDEO"] = "VIDEO";
    PostItemType["AUDIO"] = "AUDIO";
    PostItemType["LINK"] = "LINK";
})(PostItemType = exports.PostItemType || (exports.PostItemType = {}));
(0, type_graphql_1.registerEnumType)(PostItemType, {
    name: "PostItemType",
    description: "The user post item type for the post",
});
