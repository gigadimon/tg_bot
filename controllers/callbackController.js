const { directionHandler } = require("../handlers/directionHandler");
const {
  replyAudioInCallbackHandler,
} = require("../handlers/replyAudioInCallbackHandler");

const callbackController = async (ctx) => {
  const { data } = ctx.update.callback_query;
  const direction = JSON.parse(data).direction;

  return direction
    ? await directionHandler(ctx)
    : await replyAudioInCallbackHandler(ctx);
};

module.exports = { callbackController };
