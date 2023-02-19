import {
  DocumentType,
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
@modelOptions({
  schemaOptions: {
    collection: "users",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
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

  @prop({ select: false })
  password: string

  get summary() {
    return this.username + ", " + this.job.title + ", " + this.job.company
  }

  set summary(full) {
    const [username, title, company] = full.split(",")
    this.username = username.trim()
    this.job.title = title.trim()
    this.job.company = company.trim()
  }

  comparePassword(this: DocumentType<UserClass>, password: string) {
    return this.password == password
  }
}

export const UserModel = getModelForClass(UserClass)
