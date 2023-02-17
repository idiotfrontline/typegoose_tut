import {
  getModelForClass,
  index,
  modelOptions,
  prop,
} from "@typegoose/typegoose"
import validator from "validator"

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
  @prop({ required: true, minlength: 3 })
  username: string

  @prop()
  job: Job

  @prop({
    validate: {
      validator: (v: string) => {
        return validator.isEmail(v)
      },
      message: "Please give an Email",
    },
  })
  email: string
}

export const UserModel = getModelForClass(UserClass)
