import {
  prop,
  pre,
  index,
  queryMethod,
  ReturnModelType,
  modelOptions,
  getModelForClass,
} from "@typegoose/typegoose";
import { AsQueryMethod, DocumentType } from "@typegoose/typegoose/lib/types";
import { Field, InputType, ObjectType } from "type-graphql";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import mongoose, { Types } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Post } from "./post.schema";

export type Ref<T> = DocumentType<T> | Types.ObjectId;

export interface FindUserHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

function findByEmail(
  this: ReturnModelType<typeof User, FindUserHelpers>,
  email: User["email"]
) {
  return this.find({ email });
}

@pre<User>("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
})
@index({ email: 1 })
@queryMethod(findByEmail)
@modelOptions({
  schemaOptions: { timestamps: true, collection: "user" },
})
@ObjectType()
export class User {
  @Field(() => String)
  id: mongoose.Types.ObjectId;

  @Field(() => String)
  @prop({ required: true, unique: true })
  username: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @Field(() => String)
  @prop({
    required: true,
    default: function (this: DocumentType<User>) {
      const hash = crypto.createHash("md5").update(this.email).digest("hex");
      return `https://www.gravatar.com/avatar/${hash}.jpg?s=400&r=g&d=robohash`;
    },
  })
  avatar: string;

  @Field(() => String, { nullable: true })
  @prop({ type: String, default: null })
  bio: string;

  @Field(() => Boolean)
  @prop({ type: Boolean, default: false, required: true })
  verified: boolean;

  @Field(() => [User], { nullable: true })
  @prop({ ref: User, default: [] })
  followers: Ref<User>[];

  @Field(() => [User], { nullable: true })
  @prop({ ref: User, default: [] })
  following: Ref<User>[];

  @Field(() => [Post], { nullable: true })
  @prop({ ref: "Post", default: [] })
  post: Ref<Post>[];

  @Field()
  @prop({ default: () => Date.now() })
  createdAt: Date;

  @Field()
  @prop({ default: () => Date.now() })
  updatedAt: Date;
}

export const UserModel = getModelForClass<typeof User, FindUserHelpers>(User);

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @IsEmail()
  @Field(() => String, {
    description: "Email address of the user",
  })
  email: string;

  @MinLength(6, {
    message: "Password must be at least 6 characters long",
  })
  @MaxLength(20, {
    message: "Password must be at most 20 characters long",
  })
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginUserInput {
  @Field(() => String, {
    nullable: true,
  })
  username: string;

  @IsEmail()
  @Field(() => String, {
    description: "Email address of the user",
    nullable: true,
  })
  email?: string;

  @MinLength(6, {
    message: "Password must be at least 6 characters long",
  })
  @MaxLength(20, {
    message: "Password must be at most 20 characters long",
  })
  @Field(() => String)
  password: string;
}

@ObjectType()
export class UserObject {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}
