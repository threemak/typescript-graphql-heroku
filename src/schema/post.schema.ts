import {
  getModelForClass,
  index,
  modelOptions,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import { GraphQLUpload, FileUpload } from "graphql-upload";

import mongoose from "mongoose";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { PostItemType } from "../enum/post.enum";
import { User } from "./user.schema";

export interface FindPostHelpers {
  findByEmail: AsQueryMethod<typeof findByPostItemType>;
}

function findByPostItemType(
  this: ReturnModelType<typeof Post, FindPostHelpers>,
  postItemType: Post["postItemType"]
) {
  return this.find({ postItemType });
}

@index({ postItemType: 1 })
@modelOptions({
  schemaOptions: { timestamps: true, collection: "post" },
})
@ObjectType()
export class Post {
  @Field(() => String)
  id: mongoose.Types.ObjectId;

  @Field(() => String)
  @prop({ required: true, minlength: 8, maxlength: 150 })
  title: string;

  @Field(() => PostItemType, {
    defaultValue: PostItemType.TEXT,
  })
  @prop({
    type: String,
    required: true,
    enum: PostItemType,
    default: PostItemType.TEXT,
  })
  postItemType: PostItemType;

  @Field(() => String, { nullable: true })
  @prop({ type: String, default: null })
  text: string;

  @Field(() => [String], { nullable: true })
  @prop({ type: [String], default: null })
  image: string[];

  @Field(() => String, { nullable: true })
  @prop({ type: String, default: null })
  video: string;

  @Field(() => String, { nullable: true })
  @prop({ type: String, default: null })
  audio: string;

  @Field(() => String, { nullable: true })
  @prop({ type: String, default: null })
  link: string;

  @Field(() => Int)
  @prop({ required: true, default: 0 })
  likes: number;

  @Field(() => Int)
  @prop({ required: true, default: 0 })
  shares: number;

  @Field(() => Boolean)
  @prop({ required: true, default: false })
  published: boolean;

  @Field(() => User)
  @prop({ ref: "User", required: true })
  user: Ref<User>;

  @Field()
  @prop({ default: () => Date.now() })
  createdAt: Date;

  @Field()
  @prop({ default: () => Date.now() })
  updatedAt: Date;
}

export const PostModel = getModelForClass<typeof Post, FindPostHelpers>(Post);

@InputType()
export class CreateTextPost {
  @Field(() => String)
  title: string;

  @Field(() => String)
  text: string;

  @Field(() => Boolean, { defaultValue: false })
  published: boolean;
}

@InputType()
export class CreateImagePost {
  @Field(() => String)
  title: string;

  @Field(() => [GraphQLUpload])
  image: FileUpload[];

  @Field(() => Boolean, { defaultValue: false })
  published: boolean;
}
