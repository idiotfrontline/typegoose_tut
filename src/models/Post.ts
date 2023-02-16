import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose"
import { UserClass } from "./User"

@modelOptions({ schemaOptions: { collection: "posts", timestamps: true } })
class PostClass {
  @prop({ required: true })
  title!: string

  @prop()
  content?: string

  @prop({ type: () => [String] })
  tags?: string[]

  @prop({ required: true, ref: () => UserClass })
  author!: Ref<UserClass>
}

export const PostModel = getModelForClass(PostClass)
