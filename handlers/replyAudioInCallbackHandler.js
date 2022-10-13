const { uploadFileService } = require("../services/uploadFileService");
const { removeFileService } = require("../services/removeFileService");
const fs = require("fs");
const path = require("path");

const replyAudioInCallbackHandler = async (ctx) => {
  const { data } = ctx.update.callback_query;
  const { tracksData } = JSON.parse(
    fs.readFileSync(path.resolve("./tracksData.json"))
  );
  const currentUserData = tracksData.reduce((acc, user) => {
    return user.userId === ctx.update.callback_query.from.id ? user : acc;
  }, {});
  const trackInfo = currentUserData.tracks[JSON.parse(data).i];
  const { filePath, title } = trackInfo;

  await uploadFileService(trackInfo);

  ctx
    .replyWithAudio({ source: filePath, title })
    .then(async () => {
      await ctx.answerCbQuery("Загружено");
    })
    .finally(() => {
      removeFileService(filePath);
    });
};

module.exports = { replyAudioInCallbackHandler };
