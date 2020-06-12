import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Countries from './Components/Countries'

const App=() => {
  const [countries,setCountries] = useState([])
  const [foundCountries,setFoundCountries] = useState([])
  const [pattern,setPattern] = useState ('')

  const hook = () =>{
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook,[])

  console.log('We found '+foundCountries.length+' that matched' )


  const handlePattern = (event) => {
    const re = new RegExp("("+pattern+")w*","gi")
    console.log(event.target.value)

    setPattern(event.target.value)
    setFoundCountries(countries.filter(country => country.name.match(re)))
  }

  return (
    <div>
       find countries<input 
         value={pattern} onChange={handlePattern}
       />
       <Countries foundCountries={foundCountries} setFoundCountries={setFoundCountries}/>
     </div>
  )
}

export default App;
