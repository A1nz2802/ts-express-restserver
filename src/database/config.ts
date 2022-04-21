import mongoose from 'mongoose'

const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN!, {
      dbName: 'tsCafeDB'
    })

    console.log('Database online')
  } catch (err) {
    console.log(err)
    throw new Error('Database connection error')
  }
}

export default dbConnection
