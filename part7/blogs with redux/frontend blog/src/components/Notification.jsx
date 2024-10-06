import { useSelector } from "react-redux";
const Notification = (props) => {
  const stuff = useSelector((state) => state.notifications);
  console.log(stuff);
  const notification = stuff.notification;
  const type = stuff.type;
  if (!notification) {
    console.log("nulll");
    return null;
  }
  const style = {
    backgroundColor: "lightgrey",
    margin: "10px",
    padding: "10px",
    border: "2px solid",
    borderColor: type === "success" ? "green" : "red",
    borderRadius: "5px",
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
