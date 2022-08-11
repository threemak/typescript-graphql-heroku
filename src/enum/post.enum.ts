import { registerEnumType } from "type-graphql";

export enum PostItemType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  LINK = "LINK",
}

registerEnumType(PostItemType, {
  name: "PostItemType",
  description: "The user post item type for the post",
});
