import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [found, setFound ] = useState(persons)

  const addPhoneBook = (event) => {
        event.preventDefault(); //Prevent the default action which reloads the page every time you click the button
        const personObject = {
            name: newName,
            number: newNumber
        }
        const duplicate = persons.find(person => person.name === newName) ? true : false
        if (duplicate) {
            window.alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat(personObject))
        }      
        setNewName('')
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
}

  const handleFilter = (event) => {
        const re = new RegExp("("+filter+")w*","gi")    //using regex expression to find the right answer

        console.log(event.target.value)

        setFilter(event.target.value)
        setFound(persons.filter(person => 
          person.name.match(re) || person.number.match(re)
          ))
    }

 



  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter} />


      <h3>Add a new</h3>

      <PersonForm addPhoneBook={addPhoneBook} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />


      <h3>Numbers</h3>

      <Persons found={found}/>

    </div>
  )
}

export default App