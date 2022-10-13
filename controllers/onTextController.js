const { onLinkHandler } = require("../handlers/onLinkHandler");
const { onTextHandler } = require("../handlers/onTextHandler");

const onTextController = async (ctx) => {
  ctx.message.text.startsWith("https")
    ? await onLinkHandler(ctx)
    : await onTextHandler(ctx);
};

module.exports = { onTextController };
