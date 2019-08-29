import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = props => {
  return (
    <>
      <h1>{props.text}</h1>
    </>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Display = props => {
  return (
    <>
      <p>{props.text} {props.value}</p>
    </>
  )
}

const App = () => {
  // Save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <Title text={"Give Feedback"} />
      <Button onClick={handleGoodClick} text={"Good"} />
      <Button onClick={handleNeutralClick} text={"Neutral"} />
      <Button onClick={handleBadClick} text={"Bad"} />

      <Title text={"Statistics"} />
      <Display text={"Good"} value={good} />
      <Display text={"Neutral"} value={neutral} />
      <Display text={"Bad"} value={bad} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))