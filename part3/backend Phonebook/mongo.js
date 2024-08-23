const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mrhuot677:${password}@phonebook.n8phv.mongodb.net/phonebook?retryWrites=true&w=majority&appName=phonebook`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})
if (process.argv.length == 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.map(resul => console.log(resul.name +' '+ resul.number))
        mongoose.connection.close()
    })
} else {
person.save().then(result => {
    console.log('added ', process.argv[3], 'number ' + process.argv[4] + ' to phonebook')
    mongoose.connection.close()
})}