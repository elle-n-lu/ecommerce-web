declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      REDIS_URL: string;
      PAYPAL_CLIENT_ID: string;
      STRIPE_API_KEY: string;
      CLOUDINARY_URL: string;
      CLOUDINARY_NAME: string;
      CLOUDINARY_APIKEY: string;
      CLOUDINARY_SECRET: string;
      NODE_ENV: string;
    }
  }
}

export {}
