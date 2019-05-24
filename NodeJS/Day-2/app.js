/* const utils = require('./utils')
console.log(utils.add(4, 3))
console.log(utils.name) */

/**
 * Challenge: Define and use a function in a new file
 *
 * 1 Create a new file called notes.js
 * 2 Create getNotes function that return"Your notes..."
 * 3 Export getNotes function
 * 4 From app.js, load in and call function priting message to console
 */

//Use Yargs library
const yargs = require('yargs')

const notes = require("./notes")


yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: "Title note",
      demandOption: true,
      type: 'string'
    },

    body: {
      describe: "Body note",
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body)
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: "Title note",
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.removeNote(argv.title)
  }
})

yargs.parse()