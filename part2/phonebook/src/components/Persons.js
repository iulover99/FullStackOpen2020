import React from 'react'

const Persons = ({found,persons,filter}) => { 
    if (filter.length !== 0){
        return(
            <div>
                <ul>
                    {found.map(person =>
                        <li key={person.name}>{person.name} {person.number}</li>
                    )}
                </ul>
            </div>
        )   
    }
    return(
        <div>
            <ul>
                {persons.map(person =>
                    <li key={person.name}>{person.name} {person.number}</li>
                )}
            </ul>
        </div>
    )   
}

export default Persons