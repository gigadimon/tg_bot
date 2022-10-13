const { getSoundsKeyboard } = require("../services/getSoundsKeyboard");
const { Markup } = require("telegraf");
const { getTracksService } = require("../services/getTracksService");
const { configKey } = require("../services/getKeyService");

const onTextHandler = async (ctx) => {
  console.log(ctx.update.message.from.id);
  const request = ctx.message.text.toLowerCase();
  const encodedRequest = encodeURI(request);
  const token = await configKey();
  const data = {
    token,
    tracksData: {
      userId: ctx.update.message.from.id,
      offset: 0,
      query: encodedRequest,
    },
  };
  const { tracks, totalResults } = await getTracksService(data);
  totalResults
    ? ctx.reply(
        `Найдено ${totalResults} результатов`,
        Markup.inlineKeyboard(getSoundsKeyboard(tracks), { columns: 1 })
      )
    : ctx.reply("Ничего не найдено");
};

module.exports = { onTextHandler };
