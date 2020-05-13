import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good,neutral,bad,all }) => {
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <table>
        <Statistic text="good" value ={good} />
        <Statistic text="neutral" value ={neutral} />
        <Statistic text="bad" value ={bad} />
        <Statistic text="all" value ={all} />
        <Statistic text="average" value ={(good-bad)/all} />
        <Statistic text="positive" value ={(good/all)*100} />
      </table>
    </div>
  )
}

const Statistic = ({ text,value })=> (
  // <p>{text} {value}</p>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
)

const Button = ({ onClick, text }) => (
  <button onClick = {onClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text ='good' />
      <Button onClick={handleNeutral} text ='neutral' />
      <Button onClick={handleBad} text ='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
