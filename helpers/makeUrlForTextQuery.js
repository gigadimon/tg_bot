require("dotenv").config();

const makeUrlForTextQuery = (data) => {
  const { prevPage, direction, firstPage, otherPage, tracksData, token } = data;
  const { query } = tracksData;
  let url;
  !direction
    ? (url = `https://api-v2.soundcloud.com/search?q=${query}&client_id=${token}`)
    : prevPage === 0 && direction === "previous"
    ? (url = firstPage)
    : (url = otherPage);
  return { url, tracksData };
};

module.exports = { makeUrlForTextQuery };
