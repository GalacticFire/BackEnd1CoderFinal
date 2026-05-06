import dotenv  from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 8080,
  mongo: {
    uri: process.env.MONGO_URL,
  },
};
