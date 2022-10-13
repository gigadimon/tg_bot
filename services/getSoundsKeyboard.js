const { Markup } = require("telegraf");

const getSoundsKeyboard = (tracks) => {
  return [
    [Markup.button.callback(`⇧`, JSON.stringify({ direction: "previous" }))],
    ...tracks.map((track, i) => {
      return [
        Markup.button.callback(
          `${track.duration} ${track.title}`,
          JSON.stringify({ i })
        ),
      ];
    }),
    [Markup.button.callback(`⇩`, JSON.stringify({ direction: "next" }))],
  ];
};

module.exports = { getSoundsKeyboard };
