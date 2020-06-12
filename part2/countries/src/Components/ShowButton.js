import React from 'react'

const ShowButton = ({handleClick,text}) => {


    return (
    <button onClick={handleClick}>{text}</button>
    )
}

export default ShowButton