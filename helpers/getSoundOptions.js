const getSoundOptions = (obj) => {
  return {
    url: obj.media?.transcodings.filter(
      ({ format }) =>
        format.mime_type === "audio/mpeg" && format.protocol !== "hls"
    )[0]?.url,
    token: obj.track_authorization,
  };
};

module.exports = { getSoundOptions };
