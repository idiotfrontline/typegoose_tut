import { UserModel } from "./models/User"
import mongoose from "mongoose"

const run = async (func: any) => {
  await mongoose.connect("mongodb://localhost:27018", {
    dbName: "typegoose_tut",
  })

  await func()

  await mongoose.disconnect()
}

const createUsers = async () => {
  await UserModel.create({
    username: "Conny",
    job: {
      title: "programmer",
      company: "booble",
    },
  })
}

const queryUsers = async () => {
  const res = await UserModel.find({
    username: "Conny",
    "job.company": "booble",
  }).exec()
  console.log(res)
}

run(queryUsers)
