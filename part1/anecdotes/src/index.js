import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
  const [selected, setSelected] = useState(0)

  const [ points, setPoint ] = useState(new Array(anecdotes.length).fill(0))

  const [ mostVote, setMostVote] = useState ({max:0, mostVotePosition:0})

  const handleRandomAnecdotes = () => {  
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const handlePoint = () => {  
    //use splice to change the array to new one with modify value
    const copy = [...points]
    copy.splice(selected,1,copy[selected]+1)
    setPoint(copy)
    copy.forEach(element => {
      if(element>mostVote.max) {
        const newMax = { max : element, mostVotePosition : copy.indexOf(element)}
        setMostVote(newMax)
      }
    })
    console.log(copy);
  }


  return (
    <div>
      <h1>Anecdote of he day</h1>
      <p>{props.anecdotes[selected]}</p>
      <button onClick={handlePoint}>vote</button>
      <button onClick={handleRandomAnecdotes}>next anecdotes</button>

      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[mostVote.mostVotePosition]}</p>
      <p>has {mostVote.max} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)