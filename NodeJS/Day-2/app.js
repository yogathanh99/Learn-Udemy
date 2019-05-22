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

const notes = require("./notes")
console.log(notes())