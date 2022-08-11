import { ApolloError, AuthenticationError } from "apollo-server-core";
import { FileUpload } from "graphql-upload";
import { Types } from "mongoose";
import { PostItemType } from "../enum/post.enum";
import { CreateTextPost, Post, PostModel } from "../schema/post.schema";
import { User, UserModel } from "../schema/user.schema";
import Context from "../types/context";
import { uploadAudioORVideo, uploadPhoto } from "../utils/fileupload";

class PostService {
  constructor() {}
  async createTextPost(
    input: CreateTextPost & { user: User["id"] },
    context: Context
  ): Promise<Post> {
    const user = context.user!;
    if (!user) {
      throw new AuthenticationError(
        "You must be logged in to create a text post"
      );
    }
    const post = await PostModel.create(input);

    await UserModel.findByIdAndUpdate(
      user.id,
      { $push: { post: new Types.ObjectId(post._id) } },
      { new: true }
    );

    return post.populate("user");
  }

  async createImagePost(
    title: string,
    image: FileUpload[],
    published: boolean,
    context: Context
  ): Promise<Post> {
    const user = context.user!;
    if (!user) {
      throw new AuthenticationError(
        "You must be logged in to create a image post"
      );
    }
    if (image.length > 8) {
      throw new ApolloError("You can only upload 8 image");
    }
    const url = await uploadPhoto(image, user?.id.toString()).then(
      (url) => url
    );
    const arrayUrl = url.map((url) => url[0]);
    const post = await PostModel.create({
      title,
      postItemType: PostItemType.IMAGE,
      image: arrayUrl,
      published: published,
      user: user.id,
    });

    await UserModel.findByIdAndUpdate(
      user.id,
      { $push: { post: new Types.ObjectId(post._id) } },
      { new: true }
    );
    return post.populate("user");
  }

  async createVideoPost(
    title: string,
    video: FileUpload,
    published: boolean,
    context: Context
  ): Promise<Post> {
    const user = context.user!;
    if (!user) {
      throw new AuthenticationError(
        "You must be logged in to create a video post"
      );
    }
    const videoUrl = await uploadAudioORVideo(
      video,
      user?.id.toString(),
      "video"
    ).then((url) => url);
    console.log(videoUrl);
    const post = await PostModel.create({
      title,
      postItemType: PostItemType.VIDEO,
      video: videoUrl[0],
      published: published,
      user: user.id,
    });

    await UserModel.findByIdAndUpdate(
      user.id,
      { $push: { post: new Types.ObjectId(post._id) } },
      { new: true }
    );
    return post.populate("user");
  }

  async createAudioPost(
    title: string,
    audio: FileUpload,
    published: boolean,
    context: Context
  ): Promise<Post> {
    const user = context.user!;
    if (!user) {
      throw new AuthenticationError(
        "You must be logged in to create a audio post"
      );
    }
    const audioUrl = await uploadAudioORVideo(
      audio,
      user.id.toString(),
      "video"
    ).then((url) => url);
    console.log(audioUrl);
    const post = await PostModel.create({
      title,
      postItemType: PostItemType.AUDIO,
      audio: audioUrl[0],
      published: published,
      user: user.id,
    });
    await UserModel.findByIdAndUpdate(
      user.id,
      { $push: { post: new Types.ObjectId(post._id) } },
      { new: true }
    );
    return post.populate("user");
  }

  async createLinkPost(
    title: string,
    link: string,
    published: boolean,
    context: Context
  ): Promise<Post> {
    const user = context.user!;
    if (!user) {
      throw new AuthenticationError(
        "You must be logged in to create a link post"
      );
    }
    const post = await PostModel.create({
      title,
      postItemType: PostItemType.LINK,
      link: link,
      published: published,
      user: user.id,
    });
    await UserModel.findByIdAndUpdate(
      user.id,
      { $push: { post: new Types.ObjectId(post._id) } },
      { new: true }
    );
    return post.populate("user");
  }
}

export default PostService;
