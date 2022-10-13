const { ForUserError } = require("../errors/ForUserError");

const errorController = async (error, ctx) => {
  console.log(error.message);
  error instanceof ForUserError
    ? await ctx.answerCbQuery(error.message)
    : await ctx.answerCbQuery("Повтори попытку");
};

module.exports = { errorController };
