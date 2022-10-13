const axios = require("axios");
const { getTrackListData } = require("../services/getTrackListData");
const { makeUrlForTextQuery } = require("../helpers/makeUrlForTextQuery");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const getTracksService = async (data) => {
  const { tracksData: oldTracksData } = JSON.parse(
    fs.readFileSync(path.resolve("./tracksData.json"))
  );
  const { direction, nextPage, token } = data;
  const { url, tracksData } = makeUrlForTextQuery(data);
  const { data: response } = await axios(url);
  if (direction === "next" && nextPage >= response.total_results) {
    tracksData.offset -= 10;
  }

  const tracks = await getTrackListData(response, token);
  const newUserData = {
    ...tracksData,
    tracks,
    queryUrn: encodeURI(response.query_urn),
  };
  const newTracksData = !oldTracksData
    ? [newUserData]
    : oldTracksData.filter((el) => tracksData.userId === el.userId).length > 0
    ? oldTracksData.map((el) =>
        tracksData.userId === el.userId ? newUserData : el
      )
    : [...oldTracksData, newUserData];
  fs.writeFileSync(
    path.resolve("./tracksData.json"),
    JSON.stringify({
      token,
      tracksData: newTracksData,
    })
  );
  return { tracks, totalResults: response.total_results };
};

module.exports = { getTracksService };
