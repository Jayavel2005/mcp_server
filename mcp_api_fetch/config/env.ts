import dotenv from "dotenv-ts";

dotenv.config();

export const config = {
  OPENWEATHER_API: process.env.OPENWEATHER_API,
};
