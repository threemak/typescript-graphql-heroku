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
const type_graphql_1 = require("type-graphql");
const user_schema_1 = require("../schema/user.schema");
const user_service_1 = __importDefault(require("../service/user.service"));
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
        this.userService = new user_service_1.default();
    }
    async currentUser(context) {
        var _a;
        return user_schema_1.UserModel.findById((_a = context.user) === null || _a === void 0 ? void 0 : _a.id)
            .populate({
            path: "post",
            options: { sort: { createdAt: -1 } },
        })
            .exec();
    }
    signup(input, context) {
        return this.userService.signup(input, context);
    }
    signin(input, context) {
        return this.userService.signin(input, context);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => user_schema_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "currentUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_schema_1.UserObject),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.CreateUserInput, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "signup", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_schema_1.UserObject),
    __param(0, (0, type_graphql_1.Arg)("input")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.LoginUserInput, Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "signin", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_service_1.default])
], UserResolver);
exports.default = UserResolver;
