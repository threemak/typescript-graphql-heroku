import { AuthenticationError } from "apollo-server-core";
import {
  CreateUserInput,
  LoginUserInput,
  UserModel,
  UserObject,
} from "../schema/user.schema";
import bcrypt from "bcrypt";
import Context from "../types/context";
import { signJWT } from "../utils/jwt";

class UserService {
  async signup(input: CreateUserInput, ctx: Context): Promise<UserObject> {
    // check if username is exist
    const username = await UserModel.findOne({ username: input.username });
    if (username) {
      throw new AuthenticationError("Username is exist.Try another one");
    }
    const email = await UserModel.findOne({ email: input.email });
    if (email) {
      throw new AuthenticationError("Email is exist.Try another one");
    }
    const user = await UserModel.create(input);
    const id = user.id;
    // generate JWT from user
    const token = signJWT({ id });
    return {
      token,
      user,
    };
  }

  async signin(input: LoginUserInput, ctx: Context): Promise<UserObject> {
    if (input.email) {
      input.email.trim().toLowerCase();
    }
    // find the user by username and email
    const user = await UserModel.findOne({
      $or: [{ username: input.username }, { email: input.email }],
    });
    if (!user) {
      throw new AuthenticationError("Username or email is not exist");
    }
    // if the passwords don't match, throw an authentication error
    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) {
      throw new AuthenticationError("Password is incorrect");
    }
    // generate JWT from user
    const id = user.id;
    const token = signJWT({ id });
    return {
      token,
      user,
    };
  }
}
export default UserService;
