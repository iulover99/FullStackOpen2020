import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [found, setFound] = useState(persons)


  useEffect(() =>{
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  },[])
  console.log('render', persons.length,'persons')



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
        setNewNumber('')
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
        console.log(found)
    }



  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilter={handleFilter} />


      <h3>Add a new</h3>

      <PersonForm addPhoneBook={addPhoneBook} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />


      <h3>Numbers</h3>

      <Persons found={found} persons={persons} filter={filter}/>

    </div>
  )
}

export default App