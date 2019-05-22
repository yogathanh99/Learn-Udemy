/**
 * Challenge: Append a message to notes.txt
 *
 * 1 Use appendFileSync to append to the file
 * 2 Run the script
 * 3 Check your work by opening the file and viewing the appended text
 */

const fs = require('fs')

/* fs.writeFileSync('notes.txt','Hello world') */
fs.appendFileSync('notes.txt', ' Hello world')