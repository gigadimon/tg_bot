const { getSoundOptions } = require("./getSoundOptions");

const getFilesDataFromSoundList = (list) => {
  return list
    .filter((el) => el.title)
    .map((el) => ({
      ...getSoundOptions(el),
      title: el.title,
      duration: el.duration,
    }))
    .filter((el) => el.url);
};

module.exports = { getFilesDataFromSoundList };
