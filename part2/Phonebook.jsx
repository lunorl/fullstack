import { useState, useEffect } from 'react'
import axios from 'axios'
const Mapper = ({persons, newFilter}) => {
  return ( 
    <div>
    {persons
      .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
      .map((person, index) => (
      <li key={index}>
        {person.name} {person.number}
        </li> 
        ))}
        </div>
      )
  }
const Filter = ({newFilter, handlefChange}) => {
  return <div>
  <h2>Phonebook</h2>
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
  const hook = () => {
    axios.get('http://localhost:3001/persons').then(
      people => { setPersons(people.data)}
    )
  }
  useEffect(hook, [])
const AddNew = (event) => {
  event.preventDefault(); persons.find
  if (persons.some(person => person.name === newName)) {
    alert(`${newName} is already added to phonebook`)
  } else {
    console.log(persons)
    console.log()
    const personObject = { name: newName, number: newNum };
    console.log('button clicked', event.target)
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNum('')
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
      <Filter newFilter={newFilter} handlefChange={handlefChange}/>
      <Form handleChange={handleChange} handleoChange={handleoChange} AddNew={AddNew} newName={newName} newNum={newNum}/>
      <h2>Numbers</h2>
        <Mapper persons={persons} newFilter={newFilter}/>
    </div>
  );
};

export default App  
