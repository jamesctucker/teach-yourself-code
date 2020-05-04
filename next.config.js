const withSass = require("@zeit/next-sass");
const withImages = require("next-images");
const withCSS = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");

require("dotenv").config();

module.exports = withImages(withCSS(withPurgeCss()));

module.exports = {
  target: "serverless",
  ...withSass(),

  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE: "openid profile",
    REDIRECT_URI:
      process.env.REDIRECT_URI || "http://localhost:8800/api/callback",
    POST_LOGOUT_REDIRECT_URI:
      process.env.POST_LOGOUT_REDIRECT_URI || "http://localhost:8800/",
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: 7200, // 2 hours
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  },
};
