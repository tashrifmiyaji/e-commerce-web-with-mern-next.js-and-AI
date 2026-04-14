const OpenAI = require("openai");
const env = require("../config/env");

const openai = new OpenAI({
	apiKey: env.openai.apiKey,
});

module.exports = openai;