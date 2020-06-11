import React from 'react'

const Persons = ({found}) => {
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

export default Persons