import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = props => {
  return (
    <>
      <h1>{props.text}</h1>
    </>
  )
}

const Statistic = props => (
  <tbody>
    <tr>
      <td>{props.text} </td>
      <td> {props.value}</td>
    </tr>
  </tbody>
)

const Statistics = ({ good, bad, neutral }) => {
  const sum = () => (
    good + neutral + bad
  )

  const average = () => (
    (good - bad) / (good + neutral + bad)
  )

  const positivePercent = () => (
    ((good / (good + neutral + bad)) * 100) + " %"
  )

  if (!good && !neutral && !bad) {
    return (
      <>
        <p>No Feedback Given</p>
      </>
    )
  }

  return (
    <table>
      <Statistic text={"Good"} value={good} />
      <Statistic text={"Neutral"} value={neutral} />
      <Statistic text={"Bad"} value={bad} />
      <Statistic text={"All"} value={sum()} />
      <Statistic text={"Average"} value={average()} />
      <Statistic text={"Positive"} value={positivePercent()} />
    </table>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Buttons = ({
  good,
  neutral,
  bad,
  setGood,
  setNeutral,
  setBad }) => {
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
      <Button onClick={handleGoodClick} text={"Good"} />
      <Button onClick={handleNeutralClick} text={"Neutral"} />
      <Button onClick={handleBadClick} text={"Bad"} />
    </>
  )
}

const App = () => {
  // Save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Title text={"Give Feedback"} />
      <Buttons
        good={good}
        neutral={neutral}
        bad={bad}
        setGood={setGood}
        setNeutral={setNeutral}
        setBad={setBad} />

      <Title text={"Statistics"} />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))