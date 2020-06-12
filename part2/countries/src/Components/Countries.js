import React from 'react'
import CountryView from './CountryView'
import ShowButton from './ShowButton'

const Countries = ({foundCountries,setFoundCountries}) => {


    if (foundCountries.length > 10) {
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (foundCountries.length ===0) {
        return(
            <div>
                Let start the search shall we!!!
            </div>
        )
    } else if (foundCountries.length >= 2) {
        return (
            <div>
                <ul>{foundCountries.map(country =>
                    <li key={country.numericCode}>
                        {country.name}
                        <ShowButton handleClick={()=>setFoundCountries([country])} text='show' />
                    </li>
                    )}
                </ul>
            </div>
        )
    } else{
        const onlyCountry = foundCountries[0]
        console.log(onlyCountry)
        return (
            <CountryView onlyCountry={onlyCountry}/>
        )
    }
}

export default Countries