import {
  getModelForClass,
  modelOptions,
  plugin,
  pre,
  prop,
  Ref,
} from "@typegoose/typegoose"
import { UserClass } from "./User"
import autopopulate from "mongoose-autopopulate"

@plugin(autopopulate)
@pre<PostClass>("save", function () {
  this.title = this.title.toUpperCase()
})
@modelOptions({ schemaOptions: { collection: "posts", timestamps: true } })
class PostClass {
  @prop({ required: true })
  title!: string

  @prop()
  content?: string

  @prop({ type: () => [String] })
  tags?: string[]

  @prop({ autopopulate: true, required: true, ref: () => UserClass })
  author!: Ref<UserClass>
}

export const PostModel = getModelForClass(PostClass)
