import "dotenv/config";
import "reflect-metadata";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import { graphqlUploadExpress } from "graphql-upload";

import { resolvers } from "./resolvers";
import { connectDB } from "./utils/mongoose";
import { verifyJWT } from "./utils/jwt";
import { User, UserModel } from "./schema/user.schema";
import Context from "./types/context";
import authChecker from "./types/authChecker";
import { HelloResolver } from "./resolvers/hello.resolver";

async function startApolloServer() {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
    authChecker: authChecker,
    emitSchemaFile: true,
  });

  const app = express();
  app.use(express.json({ type: "application/json" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    graphqlUploadExpress({
      maxFiles: 10,
    })
  );
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    // context: async (ctx: Context) => {
    //   const context = ctx;
    //   if (context.req.headers.authorization) {
    //     const token = verifyJWT<User>(ctx.req.headers.authorization || "");
    //     const user = await UserModel.findById<User>(token!.id).exec();
    //     context.user = user;
    //   }
    //   return context;
    // },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault({
            footer: false,
          }),
    ],
    introspection: process.env.NODE_ENV === "production" ? false : true,
  });

  // connect to mongoDB
  connectDB(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await apolloServer.start();
  const PORT = process.env.PORT || 3000;
  apolloServer.applyMiddleware({ app, path: "/" });
  await new Promise<void>((resolve) => httpServer.listen(PORT, resolve));

  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  );
}
startApolloServer();
