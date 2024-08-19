const Header = ({ course }) => <h3>{course}</h3>
const Course = ({course}) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts} />
  </>
)
const Render = ({courses}) => {
  return courses.map(course => <div key={course.id}><Course course={course} /></div>)
}
const Total = ({ sum }) => {
  const total = sum.reduce((accumulator, group) => {return accumulator + group.exercises;}, 0);
  
  return <b>total of {total} exercises</b>
}
const Content = ({ parts }) => {
  return parts.map(part => 
  <p key={part.id}>
    {part.name} {part.exercises}
    </p> 
  )
}
export default Render
