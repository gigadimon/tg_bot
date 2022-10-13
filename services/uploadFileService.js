const fs = require("fs");
const https = require("https");
const { ForUserError } = require("../errors/ForUserError");

const uploadFileService = (data) => {
  return new Promise((resolve, reject) => {
    const { filePath, fileUrl } = data;

    https.get(fileUrl, (res) => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        return reject(new ForUserError("Срок действия ссылки истёк"));
      }
      const stream = fs.createWriteStream(filePath);
      res
        .pipe(stream)
        .on("error", (error) => {
          reject(error);
        })
        .on("close", () => {
          resolve(data);
        });
    });
  });
};

module.exports = { uploadFileService };
