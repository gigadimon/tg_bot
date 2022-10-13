const path = require("path");
const fs = require("fs");
require("dotenv").config();

const getDirectionData = (ctx) => {
  const { data } = ctx.update.callback_query;
  const direction = JSON.parse(data).direction;
  const { tracksData, token } = JSON.parse(
    fs.readFileSync(path.resolve("./tracksData.json"))
  );
  const currentUserData = tracksData.reduce((acc, user) => {
    return user.userId === ctx.update.callback_query.from.id ? user : acc;
  }, {});
  const { queryUrn, offset, query } = currentUserData;
  const prevPage = offset - 10;
  const nextPage = offset + 10;
  const firstPage = `https://api-v2.soundcloud.com/search?q=${query}&client_id=${token}`;
  const otherPage = `${process.env.BASE_URN}${queryUrn}&limit=10&offset=${
    direction === "next" ? nextPage : prevPage
  }&q=${query}&client_id=${token}`;

  return {
    tracksData: currentUserData,
    token,
    prevPage,
    nextPage,
    firstPage,
    otherPage,
    direction,
  };
};

module.exports = { getDirectionData };
