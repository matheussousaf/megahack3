const fs = require("fs");
const path = require("path");
require("dotenv").config()

const currentPath = path.join(__dirname, "..", "..");
console.log(currentPath + `/credentials.json`);


fs.writeFile(currentPath + `/credentials.json`, process.env.GOOGLE_CREDENTIALS, (err) => {
    console.log("Criando credenciais");
})