const fs = require("fs");

const removeFileService = (path) => {
  fs.existsSync(path)
    ? fs.unlinkSync(path)
    : console.log(
        "Уже удалён или поступил одинаковый запрос до последнего ответа"
      );
};

module.exports = { removeFileService };
