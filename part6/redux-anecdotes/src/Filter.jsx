import { useDispatch } from "react-redux"
const bang = (value) => {
    console.log(value)
    return {
        type: 'filter/newFilter',
        payload: value
    }
}
const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch(bang(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter