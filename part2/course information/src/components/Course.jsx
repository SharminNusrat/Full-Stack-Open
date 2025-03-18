const Header = ({course}) => <h2>{course}</h2>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({total}) => <p><b>total of {total} exercises</b></p>

const Course = ({course}) => {
  const total = course.parts.reduce((sum, part) => {
    return sum += part.exercises
  }, 0)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </div>
  )
}

export default Course