import mongoose from "mongoose"

const run = async (func: any) => {
  await mongoose.connect("mongodb://localhost:27018", {
    dbName: "typegoose_tut",
  })

  await func()

  await mongoose.disconnect()
}

const printSomething = () => {
  console.log("Hello!")
}

run(printSomething)
