const fs = require('fs')

const addNote = (title, body) => {
  const notes = loadNotes()
  const isDuplicated = notes.filter(note => note.title === title)

  if (isDuplicated.length === 0) {
    notes.push({
      title,
      body
    })

    saveNotes(notes)
    console.log('New note added !')
  } else {
    console.log('Note title taken!')
  }
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('data.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (error) {
    return []
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('data.json', dataJSON)
}

const removeNote = (title) => {
  const notes = loadNotes()

  let indexRemove = -1
  indexRemove = notes.findIndex(note => note.title === title)

  if (indexRemove === -1) {
    console.log('No note found!')
  } else {
    console.log('Note removed!')

    notes.splice(indexRemove, 1)
    saveNotes(notes)
  }
}

module.exports = {
  addNote,
  removeNote
}