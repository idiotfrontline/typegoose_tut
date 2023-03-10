import { PostModel } from "./models/Post"
import { UserModel } from "./models/User"
import mongoose from "mongoose"
import util from "util"

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
  // await UserModel.collection.drop()
  await PostModel.collection.drop()
}

const createPosts = async () => {
  const conny = await UserModel.findOne({ username: "Conny" }).exec()
  const adrian = await UserModel.findOne({ username: "Adrian" }).exec()

  if (!conny) return
  if (!adrian) return

  await PostModel.create([
    {
      title: "Hello",
      content: "Good morning!",
      tags: ["blog"],
      author: conny.id,
    },
    {
      title: "Hello2",
      content: "Good afternoon!",
      tags: ["blog"],
      author: conny.id,
    },
    {
      title: "Hello3",
      content: "Typegoose is fun!",
      tags: ["coding"],
      author: adrian.id,
    },
  ])
}

const queryPosts = async () => {
  const res = await PostModel.find()
    .populate({ path: "author", select: "username job.title" })
    .exec()

  console.log(util.inspect(res, false, null, true))
}

const updateUsers = async () => {
  await UserModel.findOneAndUpdate(
    { username: "Conny" },
    { email: "conny@abc.com" },
    { runValidators: true }
  ).exec()

  const user = await UserModel.findOne({ username: "Adrian" }).exec()
  if (!user) return
  user.email = "adrian@abc.com"
  await user.save()
}

const getVirtual = async () => {
  const res = await UserModel.findOne({ username: "Conny" }).exec()
  console.log(res)
  console.log(res?.summary)
}

const setVirutal = async () => {
  const user = await UserModel.findOne({ username: "Conny" }).exec()
  if (!user) return
  user.summary = "Conny!, developer, bighead"
  await user.save()
}

const addPasswords = async () => {
  await UserModel.findOneAndUpdate(
    { username: "Conny" },
    { password: "pw1" }
  ).exec()
  await UserModel.findOneAndUpdate(
    { username: "Adrian" },
    { password: "pw2" }
  ).exec()
}

const instanceMethod = async () => {
  const user = await UserModel.findOne({ username: "Conny" })
    .select("+password")
    .exec()

  const res = user?.comparePassword("pw1")
  console.log("comparePassword: ", res)
}

const staticMethod = async () => {
  const res = await UserModel.getPostByUsername("Conny")
  console.log(res)
}

const tryPlugin = async () => {
  const user = await UserModel.findOne({ username: "Adrian" }).exec()
  if (!user) return
  const posts = await PostModel.find({ author: user.id }).exec()

  console.log(posts)
}

run(tryPlugin)
