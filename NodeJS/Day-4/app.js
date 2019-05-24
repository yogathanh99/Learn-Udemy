const fs = require('fs')

const data = {
  name: "Thanh",
  sex: "male"
}

const dataBuffer = fs.writeFileSync('data.json', JSON.stringify(data))
console.log('Done write')

const dataRead = fs.readFileSync('data.json')

const newData = JSON.parse(dataRead.toString())
newData.name = "ThanhVo"

fs.writeFileSync('data-new.json', JSON.stringify(newData))
console.log('Done write new data')