const greetingController = (ctx) => {
  const text = `Привет, ${ctx.update.message.from.first_name}! Пиши, что хочешь найти - я помогу`;
  ctx.reply(text);
};

module.exports = { greetingController };
