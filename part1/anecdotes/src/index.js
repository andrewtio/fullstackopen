import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Anecdotes = ({ anecdotes, selected }) => (
  <div>
    {anecdotes[selected]}
  </div>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const DisplayVote = ({ selected, points }) => (
  <div>
    Has {points[selected]} Votes
  </div>
)

const Title = props => (
  <div>
    <h1>{props.text}</h1>
  </div>
)

const FavAnecdote = (props) => {
  const favAnecdote = props.points.indexOf(Math.max(...props.points));
  console.log("favAnecdote", favAnecdote)

  if (!props.points.some(el => el > 0)) {
    return (
      <div>No one has voted yet</div>
    )
  }

  return (
    <>
      <div>{anecdotes[favAnecdote]}</div>
      <div>Has {props.points[favAnecdote]} Votes</div>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(6).fill(0))

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random(selected) * props.anecdotes.length))
  }
  console.log("selected", selected)

  const handleVote = (selected) => () => {
    const copy = [...points]
    // increment the property 2 value by one
    copy[selected] += 1
    setPoints(copy)
    console.log("copy", copy)
  }

  return (
    <>
      <Title text={"Anecdote of the Day"} />
      <Anecdotes
        anecdotes={props.anecdotes}
        selected={selected} />
      <DisplayVote points={points} selected={selected} />
      <Button
        onClick={handleVote(selected)}
        text={"Vote"} />
      <Button
        onClick={handleNextAnecdote}
        text={"Next Anecdote"} />
      <Title text={"Anecdote with most Votes"} />
      <FavAnecdote points={points} />
    </>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
