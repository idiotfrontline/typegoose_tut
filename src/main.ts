import { UserModel } from "./models/User"
import mongoose from "mongoose"

const run = async (...funcs: any) => {
  await mongoose.connect("mongodb://localhost:27018", {
    dbName: "typegoose_tut",
  })

  for (const func of funcs) {
    await func()
  }

  await mongoose.disconnect()
}

const createUsers = async () => {
  await UserModel.create([
    {
      username: "Conny",
      job: {
        title: "programmer",
        company: "booble",
      },
    },
    {
      username: "Adrian",
      job: {
        title: "consultant",
        company: "bigface",
      },
    },
  ])
}

const queryUsers = async () => {
  const res = await UserModel.find({
    username: "Conny",
    "job.company": "booble",
  }).exec()
  console.log(res)
}

const dropData = async () => {
  await UserModel.collection.drop()
}

run(dropData, createUsers)
