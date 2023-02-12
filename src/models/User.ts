import { getModelForClass, prop } from "@typegoose/typegoose"

export class UserClass {
  @prop({ required: true })
  username: string
}

export const UserModel = getModelForClass(UserClass)
