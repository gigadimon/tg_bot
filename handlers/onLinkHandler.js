const axios = require("axios");
const { getSoundOptions } = require("../helpers/getSoundOptions");
const { getSoundData } = require("../services/getTrackListData");
const { uploadFileService } = require("../services/uploadFileService");
const { configKey } = require("../services/getKeyService");
const { removeFileService } = require("../services/removeFileService");

const onLinkHandler = async (ctx) => {
  const token = await configKey();
  const { data: mainReqData } = await axios(
    `https://api-v2.soundcloud.com/resolve?url=${ctx.message.text}&client_id=${token}`
  );
  const { title } = mainReqData;
  const options = getSoundOptions(mainReqData);
  const soundData = await getSoundData({ ...options, title }, token);
  const { filePath } = await uploadFileService(soundData);

  ctx.replyWithAudio({ source: filePath }).finally(() => {
    removeFileService(filePath);
  });
};

module.exports = { onLinkHandler };
