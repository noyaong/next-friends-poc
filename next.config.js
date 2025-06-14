const { config } = require('dotenv')

// config.env 파일 로드
config({ path: './config.env' })

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    AI_MODEL: process.env.AI_MODEL,
    AI_TEMPERATURE: process.env.AI_TEMPERATURE,
    AI_MAX_TOKENS: process.env.AI_MAX_TOKENS
  }
}

module.exports = nextConfig
