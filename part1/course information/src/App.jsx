const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.contents[0].part} exercise={props.contents[0].exercise} />
      <Part part={props.contents[1].part} exercise={props.contents[1].exercise} />
      <Part part={props.contents[2].part} exercise={props.contents[2].exercise} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const contents = [
    {part: part1, exercise: exercises1},
    {part: part2, exercise: exercises2},
    {part: part3, exercise: exercises3},
  ]

  return (
    <div>
      <Header course={course} />
      <Content contents={contents} />
      <Total exercises={exercises1+exercises2+exercises3} />
    </div>
  )
}

export default App