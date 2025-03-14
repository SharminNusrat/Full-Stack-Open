import { useState } from 'react'

const Display = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Feedback = ({type, count}) => {
  if(type === "positive") {
    return (
      <div>{type} {count}%</div>
    )
  }
  return (
    <div>{type} {count}</div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Display text="give feedback" />
      <Button onClick={handleGoodFeedback} text="good" />
      <Button onClick={handleNeutralFeedback} text="neutral" />
      <Button onClick={handleBadFeedback} text="bad" />
      <Display text="statistics" />
      <Feedback type="good" count={good}/>
      <Feedback type="neutral" count={neutral}/>
      <Feedback type="bad" count={bad}/>
      <Feedback type="all" count={good + neutral + bad}/>
      <Feedback type="average" count={(good*1 + neutral*0 + bad*-1) / (good + neutral + bad)}/>
      <Feedback type="positive" count={(good / (good + neutral + bad))*100}/>
    </div>
  )
}

export default App