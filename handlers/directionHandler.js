const { getSoundsKeyboard } = require("../services/getSoundsKeyboard");
const { getDirectionData } = require("../helpers/getDirectionData");
const { getTracksService } = require("../services/getTracksService");

const directionHandler = async (ctx) => {
  console.log(ctx.update.callback_query.from.id);
  const data = getDirectionData(ctx);
  const { direction, prevPage, nextPage, tracksData } = data;
  tracksData.offset = direction === "next" ? nextPage : prevPage;
  if (direction === "previous" && prevPage < 0) {
    return ctx.answerCbQuery("Ты на первой странице");
  }
  const { tracks, totalResults } = await getTracksService(data);
  if (direction === "next" && nextPage >= totalResults) {
    return ctx.answerCbQuery("Остынь, это последняя");
  }

  ctx
    .editMessageReplyMarkup({
      inline_keyboard: getSoundsKeyboard(tracks),
    })
    .finally(async () => {
      await ctx.answerCbQuery(
        `Страница ${
          direction === "next" ? nextPage / 10 + 1 : nextPage / 10 - 1
        }`
      );
    });
};

module.exports = { directionHandler };
