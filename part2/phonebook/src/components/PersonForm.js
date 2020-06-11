import React from 'react'

const PersonForm = ({addPhoneBook,newName,handleNameChange,newNumber,handleNumberChange}) => {
   return (
    <div>
        <form onSubmit={addPhoneBook}>
            <div>
                name: <input 
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                Number: <input 
                    value={newNumber} 
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    </div>
    
   ) 
}

export default PersonForm