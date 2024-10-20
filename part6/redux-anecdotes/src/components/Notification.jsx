import { useSelector } from "react-redux"
const Notification = () => {
  console.log('stuff', useSelector(state => state))
  const notification = useSelector(state => state.notification)
  console.log('noti', notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification