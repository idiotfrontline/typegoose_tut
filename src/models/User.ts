import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose"

@modelOptions({ schemaOptions: { _id: false } })
class Job {
  @prop()
  title: string

  @prop()
  company: string
}

@modelOptions({ schemaOptions: { collection: "users" } })
export class UserClass {
  @prop({ required: true })
  username: string

  @prop()
  job: Job
}

export const UserModel = getModelForClass(UserClass)
