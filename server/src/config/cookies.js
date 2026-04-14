const env = require("./env");

const baseCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: env.nodeEnv === "production",
};

const adminCookieOptions = {
  ...baseCookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000, // millisecond to 7 days
};

const guestCookieOptions = {
  ...baseCookieOptions,
  maxAge: 30 * 24 * 60 * 60 * 1000, // millisecond to 30 days
};

module.exports = {
  adminCookieOptions,
  guestCookieOptions,
};
