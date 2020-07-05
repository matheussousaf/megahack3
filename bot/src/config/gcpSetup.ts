const fs = require('fs')
const path = require('path')
require('dotenv').config()

const currentPath = path.join(__dirname, '..', '..')
console.log(currentPath + '/credentials.json')

fs.writeFile(
  currentPath + '/credentials.json',
  process.env.GOOGLE_CREDENTIALS,
  (err) => {
    if (err) {
      throw err
    }
    console.log('Criando credenciais')
    console.log('Env:' + process.env.GOOGLE_CREDENTIALS)
  }
)
