const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://Nic10:${password}@fullstackopen.4cqtj.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fullstackopen`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

//const note = new Note({
  //content: 'HTML is L',
  //important: false,
//})

Note.add({ important: true}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
  mongoose.connection.close()
})