declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGODB_CNN: string;
      SECRETORPRIVATEKEY: string;
      NODE_ENV: 'production' | 'development';
    }
  }
}

export {}
