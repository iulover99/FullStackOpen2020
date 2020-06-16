import React, { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Button from './components/Button'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [found, setFound] = useState(persons)
  const [message, setMessage] = useState(null)
  const [flag,setFlag] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPhoneBook = (event) => {
        event.preventDefault(); //Prevent the default action which reloads the page every time you click the button
        const personObject = {
            name: newName,
            number: newNumber
        }
        const duplicate = persons.find(person => person.name === newName)
        console.log(duplicate)
        if (duplicate) {
          let result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)
          if(result){ 
            personService
              .update(duplicate.id,personObject)
              .then(
                returnedPerson=> {
                  setPersons(persons.map(person=> person.id!==duplicate.id?person:returnedPerson))
                }
              )
              .catch(error => {
                setMessage(
                  `Information of ${duplicate.name} has already been removed from server`
                )
                setFlag(false)
                setTimeout(() => {
                  setMessage(null)
                }, 3000)
              })
          }
        } else {
            setPersons(persons.concat(personObject));
            personService
              .create(personObject)
              .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setFlag(true)
                setMessage(`Added ${newName}`)
              })
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
        }     
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

  
    if(filter===''){
      return(
        (
          <div>
            <h2>Phonebook</h2>
            <Notification message={message} flag={flag} />
            <Filter filter={filter} handleFilter={handleFilter} />
            <h3>Add a new</h3>
            <PersonForm addPhoneBook={addPhoneBook} 
                        newName={newName} 
                        handleNameChange={handleNameChange} 
                        newNumber={newNumber} 
                        handleNumberChange={handleNumberChange} 
            />   
            <h3>Numbers</h3>
      
            <ul>{persons.map(person =>
                <li key={person.name}>{person.name} {person.number}
                <Button handleClick={()=>{
                  let initialPersons = person.id
                  let result =  window.confirm(`Delete ${person.name} ?`)
                  if(result){ 
                    personService
                    .remove(person.id)
                    .then(
                        setPersons(persons.filter(person=>person.id !== initialPersons)))
                    }             
                  }
                } text='delete' />
                </li>
                )}
            </ul>
          </div>
        )
      )
    }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm addPhoneBook={addPhoneBook} 
                  newName={newName} 
                  handleNameChange={handleNameChange} 
                  newNumber={newNumber} 
                  handleNumberChange={handleNumberChange} 
      />
      <h3>Numbers</h3>
      <ul>{found.map(person =>
          <li key={person.name}>{person.name} {person.number}
              <Button handleClick={()=>{
                  let initialPersons = person.id
                  let result =  window.confirm(`Delete ${person.name} ?`)
                  if(result){
                    personService
                    .remove(person.id)
                    .then(
                        setPersons(persons.filter(person=>person.id !== initialPersons)))
                    }             
                  }
                } text='delete' />
          </li>
          )}
      </ul>
    </div>
  )
}

export default App