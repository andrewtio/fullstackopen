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

const Statistics = props => {
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

  const sum = () => (
    good + neutral + bad
  )

  const average = () => (
    (good - bad) / (good + neutral + bad)
  )

  const positivePercent = () => (
    ((good / (good + neutral + bad)) * 100) + " %"
  )

  return (
    <>
      <Title text={"Give Feedback"} />
      <Button onClick={handleGoodClick} text={"Good"} />
      <Button onClick={handleNeutralClick} text={"Neutral"} />
      <Button onClick={handleBadClick} text={"Bad"} />

      <Title text={"Statistics"} />
      <Statistics text={"Good"} value={good} />
      <Statistics text={"Neutral"} value={neutral} />
      <Statistics text={"Bad"} value={bad} />
      <Statistics text={"All"} value={sum()} />
      <Statistics text={"Average"} value={average()} />
      <Statistics text={"Positive"} value={positivePercent()} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))