//Use simple argument of Nodejs
/* const argument = process.argv[2]
console.log(argument) */

//Use Yargs library
const yargs = require('yargs')
let sum = 0

//Create command in Yargs - sum command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    name: {
      describe: "Name note",
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    console.log('Hello', argv.name)
  }
})

yargs.parse() //Yargs is process passing the arguments