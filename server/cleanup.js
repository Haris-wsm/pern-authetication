const path = require('path');
const fs = require('fs');
const config = require('config');
const { uploadDir, profileDir } = config;

const profileDirectory = path.join('.', uploadDir, profileDir);

const clearFolder = (folder) => {
  const files = fs.readdirSync(folder);

  for (const file of files) {
    fs.unlinkSync(path.join(folder, file));
  }
};

clearFolder(profileDirectory);
