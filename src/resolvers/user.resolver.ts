import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateUserInput,
  LoginUserInput,
  User,
  UserModel,
  UserObject,
} from "../schema/user.schema";
import UserService from "../service/user.service";
import Context from "../types/context";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() context: Context) {
    return UserModel.findById(context.user?.id)
      .populate({
        path: "post",
        options: { sort: { createdAt: -1 } },
      })
      .exec();
  }

  @Mutation(() => UserObject)
  signup(@Arg("input") input: CreateUserInput, @Ctx() context: Context) {
    return this.userService.signup(input, context);
  }

  @Mutation(() => UserObject)
  signin(@Arg("input") input: LoginUserInput, @Ctx() context: Context) {
    return this.userService.signin(input, context);
  }
}
