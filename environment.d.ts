declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      MONGODB_CNN: string
      SECRETORPRIVATEKEY: string
      NODE_ENV: 'production' | 'development'
      GOOGLE_CLIENT_ID: string
      GOOGLE_SECRET_ID: string
      CLOUDINARY_URL: string
    }
  }
}

export {}
