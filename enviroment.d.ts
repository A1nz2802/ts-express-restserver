declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGODB_CNN: string;
      NODE_ENV: 'production' | 'development';
    }
  }
}

export {};