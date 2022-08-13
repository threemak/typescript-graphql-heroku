import { HelloResolver } from "./hello.resolver";
import { PostResolver } from "./post.resolver";
import UserResolver from "./user.resolver";

export const resolvers = [PostResolver, UserResolver] as const;
