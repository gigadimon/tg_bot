require("dotenv").config();
const axios = require("axios");
const path = require("path");

const getSoundData = async ({ url, token, title = "" }) => {
  const {
    data: { url: fileUrl },
  } = await axios(
    `${url}?client_id=${process.env.SC_KEY}&track_authorization=${token}`
  );
  const filePath = path.resolve(
    `./tmp/${title.split(/[?!,.:;'"}{@#$%&*`><~()-=+\\|/]/).join("")}.mp3`
  );

  return { fileUrl, filePath, title };
};

module.exports = { getSoundData };
