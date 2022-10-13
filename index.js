const express = require("express");
const app = express();
const { startBot } = require("./bot");

startBot();
app.listen(3000, () => {
  console.log("Server running. Use our API on port:", 3000);
});
