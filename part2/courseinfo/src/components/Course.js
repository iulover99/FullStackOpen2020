import React from 'react'

const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part) =>
          <Part key= {part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Header = ({name}) => {
    return (
      <div>
        <h2>
          {name}
        </h2>
      </div>
    )
  }
  
  const Part = ({name,exercises}) => {
    return (
      <div>
        <p>{name} {exercises}</p>
      </div>
    )
  }
  
  const Total = ({parts}) => {
    let exercises = parts.map((part)=> part.exercises);
    console.log(exercises)
    return (
      <div>
        <p>Total of {exercises.reduce((accumulator, currentValue) => accumulator+currentValue,0)} exercises</p>
      </div>
    )
  }

  export default Course