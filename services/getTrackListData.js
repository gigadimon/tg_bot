const {
  getFilesDataFromSoundList,
} = require("../helpers/getFilesDataFromSoundList");
const { getTime } = require("../helpers/getTime");
require("dotenv").config();
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const getSoundData = async ({ url, token, title = "" }, key) => {
  const {
    data: { url: fileUrl },
  } = await axios(`${url}?client_id=${key}&track_authorization=${token}`);
  const filePath = path.resolve(
    `./tmp/${title.split(/[?!,.:;'"}{@#$%&*`><~()-=+\\|/]/).join("")}.mp3`
  );

  return { fileUrl, filePath, title };
};

const getTrackListData = async (data, key) => {
  const fileList = getFilesDataFromSoundList(data.collection);
  const trackList = [];
  for (const pathData of fileList) {
    const soundData = await getSoundData(pathData, key);
    const duration = getTime(pathData.duration);
    trackList.push({ ...soundData, duration });
  }

  return trackList;
};

module.exports = { getTrackListData, getSoundData };
