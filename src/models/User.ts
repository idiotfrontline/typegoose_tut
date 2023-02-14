import {
  getModelForClass,
  index,
  modelOptions,
  prop,
} from "@typegoose/typegoose"

@modelOptions({ schemaOptions: { _id: false } })
class Job {
  @prop()
  title: string

  @prop()
  company: string
}

@index({ username: 1, "job.company": 1 })
@modelOptions({ schemaOptions: { collection: "users" } })
export class UserClass {
  @prop({ required: true })
  username: string

  @prop()
  job: Job
}

export const UserModel = getModelForClass(UserClass)
