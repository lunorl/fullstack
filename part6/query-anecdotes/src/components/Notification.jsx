import NotificationContext from "../NotificationContext" 
import { useContext } from 'react'
const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notification) {
    console.log('mmm')
    return (
      <div style={style}>
      {notification}
      </div>
    )
  }

  return (
    <div style={style}>
      
    </div>
  )
}

export default Notification
