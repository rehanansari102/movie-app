// config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('env', () => ({
  uri: process.env.DATABASE_URL || 'mongodb+srv://rehan:xgbR0CnjPEa7yrVR@cluster0.68ecx.mongodb.net/moviedb',
  jwtSecret: process.env.JWT_SECRET || 'secretkey@#12',
}));
