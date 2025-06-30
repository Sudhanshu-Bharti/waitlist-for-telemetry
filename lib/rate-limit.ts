import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.REDIS_URL;
const redisToken = process.env.REDIS_TOKEN;

if (!redisUrl || !redisToken) {
  throw new Error("REDIS_URL and REDIS_TOKEN must be set in your .env file");
}

const redis = new Redis({
  url: redisUrl,
  token: redisToken,
});

export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  analytics: true,

  prefix: "@upstash/ratelimit",
}); 