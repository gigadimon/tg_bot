require("dotenv").config();
const { Telegraf } = require("telegraf");
const { greetingController } = require("./controllers/greetingController");
const { onTextController } = require("./controllers/onTextController");
const { callbackController } = require("./controllers/callbackController");
const { errorController } = require("./controllers/errorController");

const startBot = () => {
  const bot = new Telegraf(process.env.AUTH_TOKEN);

  bot.start(greetingController);
  bot.on("text", onTextController);
  bot.on("callback_query", callbackController);
  bot.catch(errorController);
  process.on("unhandledRejection", async (reason, p) => {
    console.error(reason.message);
  });

  bot.startPolling();
};

module.exports = { startBot };
