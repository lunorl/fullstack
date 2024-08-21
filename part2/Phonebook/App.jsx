import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneService from './services/notes.js'
const Notification = ({message}) => {
  if (message === null) {
    return null
  } 

  return (
    <div className='alert'>{message}</div>
  )
}
const Notificationo = ({message}) => {
  if (message === null) {
    return null
  } 

  return (
    <div className='error'>{message}</div>
  )
}
const handleClick = (person, persons, setPersons) => {
  if (window.confirm(`Delete ${person.name} ?`)) {
    phoneService.remove(person.id).then(() => {
      const newPersons = persons.filter(p => p.id !== person.id)
      setPersons(newPersons)
    })
  }
}
const Mapper = ({persons, newFilter,setPersons}) => {
  console.log(persons)
  return ( 
    <div>
    {persons
      .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
      .map((person, index) => (
      <li key={index}>
        {person.name} {person.number} 
        <button onClick={() => handleClick(person, persons, setPersons)}>delete</button>
        </li> 
        ))}
        </div>
      )
  }
const Filter = ({newFilter, handlefChange}) => {
  return <div>
  filter shown with <input value={newFilter} onChange={handlefChange}/> <br />
  <h2>add a new</h2>
  </div>
}
const Form = ({AddNew, newName, handleChange, newNum, handleoChange}) => {
  return <form onSubmit={AddNew}>
          <div>
            name: <input value={newName} onChange={handleChange}/> <br />
            number: <input value={newNum} onChange={handleoChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
}
const App = () => { 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [omessage, setoMessage] = useState(null)
  const hook = () => {
    phoneService.getAll().then(
      people => { setPersons(people)}
    )
  }
  useEffect(hook, [])
const AddNew = (event) => {
  event.preventDefault(); persons.find
  if (persons.some(person => person.name === newName)) {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
      const john = persons.filter(person => person.name === newName)[0]
      const thing = {id:john.id, name:john.name, number:newNum}
      phoneService.update(john.id, thing).then(setPersons(persons.map(person => person.id !== thing.id ? person : thing))).catch(() => {
        setoMessage(`Information of ${john.name} has already been removed from server`)
        setTimeout(() => {
          setoMessage(null)
        }, 5000)
      })
    }
  } else {
    console.log(persons)
    console.log()
    const personObject = { name: newName, number: newNum };
    console.log(persons.length)
    phoneService.create(personObject).
    then(response => {
      setMessage(`Added ${response.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setPersons(persons.concat(response))
      setNewName('')
      setNewNum('')
    })
  }
}
  const handleChange = (event)  => {
    console.log(event.target.value)
    setNewName(event.target.value)
  };
  const handleoChange = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  };
  const handlefChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Notificationo message={omessage} />
      <Filter newFilter={newFilter} handlefChange={handlefChange}/>
      <Form handleChange={handleChange} handleoChange={handleoChange} AddNew={AddNew} newName={newName} newNum={newNum}/>
      <h2>Numbers</h2>
        <Mapper persons={persons} newFilter={newFilter} setPersons={setPersons}/>
    </div>
  );
};

export default App  
