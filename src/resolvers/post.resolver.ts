import { ApolloError } from "apollo-server-core";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Types } from "mongoose";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { PostItemType } from "../enum/post.enum";

import {
  CreateImagePost,
  CreateTextPost,
  Post,
  PostModel,
} from "../schema/post.schema";
import PostService from "../service/post.service";
import Context from "../types/context";

@Resolver()
export default class PostResolver {
  constructor(private postService: PostService) {
    this.postService = new PostService();
  }

  @Query(() => Post)
  async post(@Arg("id") id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new ApolloError("Post id is required");
    }
    return PostModel.findById(id).populate("user");
  }

  @Query(() => [Post])
  async posts() {
    return PostModel.find().populate("user");
  }

  @Mutation(() => Post)
  async createTextPost(
    @Arg("input") input: CreateTextPost,
    @Ctx() context: Context
  ) {
    const user = context.user!;
    return this.postService.createTextPost(
      { ...input, user: user?.id },
      context
    );
  }

  @Mutation(() => Post)
  async createImagePost(
    @Arg("title") title: string,
    @Arg("image", () => [GraphQLUpload]) image: FileUpload[],
    @Arg("published") published: boolean,
    @Ctx() context: Context
  ) {
    return this.postService.createImagePost(title, image, published, context);
  }

  @Mutation(() => Post)
  async createVideoPost(
    @Arg("title") title: string,
    @Arg("video", () => GraphQLUpload) video: FileUpload,
    @Arg("published") published: boolean,
    @Ctx() context: Context
  ) {
    return this.postService.createVideoPost(title, video, published, context);
  }

  @Mutation(() => Post)
  async createAudioPost(
    @Arg("title") title: string,
    @Arg("audio", () => GraphQLUpload) audio: FileUpload,
    @Arg("published") published: boolean,
    @Ctx() context: Context
  ) {
    return this.postService.createAudioPost(title, audio, published, context);
  }

  @Mutation(() => Post)
  async createLinkPost(
    @Arg("title") title: string,
    @Arg("link") link: string,
    @Arg("published") published: boolean,
    @Ctx() context: Context
  ) {
    return this.postService.createLinkPost(title, link, published, context);
  }
}
