const fs = require('fs');
const path = require('path');

const bootstrap = () => {
    fs.readdirSync(__dirname)
        .filter((name) => name !== 'index.js')
        .forEach((file) => {
            const fileNameWithoutExt = file.replace(path.extname(file), '');

            exportObj[fileNameWithoutExt] = require(`./${file}`);
        });
}

const exportObj = {
    bootstrap
};

module.exports = exportObj;
