"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const apollo_server_core_1 = require("apollo-server-core");
const type_graphql_1 = require("type-graphql");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const graphql_upload_1 = require("graphql-upload");
const resolvers_1 = require("./resolvers");
const mongoose_1 = require("./utils/mongoose");
const jwt_1 = require("./utils/jwt");
const user_schema_1 = require("./schema/user.schema");
const authChecker_1 = __importDefault(require("./types/authChecker"));
async function startApolloServer() {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: resolvers_1.resolvers,
        authChecker: authChecker_1.default,
        emitSchemaFile: true,
    });
    const path = "/graphql";
    const app = (0, express_1.default)();
    app.use(express_1.default.json({ type: "application/json" }));
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, graphql_upload_1.graphqlUploadExpress)({
        maxFiles: 10,
    }));
    const httpServer = http_1.default.createServer(app);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        context: async (ctx) => {
            const context = ctx;
            if (context.req.headers.authorization) {
                const token = (0, jwt_1.verifyJWT)(ctx.req.headers.authorization || "");
                const user = await user_schema_1.UserModel.findById(token.id).exec();
                context.user = user;
            }
            return context;
        },
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            process.env.NODE_ENV === "production"
                ? (0, apollo_server_core_1.ApolloServerPluginLandingPageProductionDefault)()
                : (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({
                    footer: false,
                }),
        ],
        introspection: process.env.NODE_ENV === "production" ? false : true,
    });
    // connect to mongoDB
    (0, mongoose_1.connectDB)(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path });
    await new Promise((resolve) => httpServer.listen(3000, resolve));
    console.log(`🚀 Server ready at http://localhost:3000${apolloServer.graphqlPath}`);
}
startApolloServer();
