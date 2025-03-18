const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => <p><b>total of {props.total} exercises</b></p>

const Course = (props) => {
  const total = props.course.parts.reduce((sum, part) => {
    return sum += part.exercises
  }, 0)

  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total total={total} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App