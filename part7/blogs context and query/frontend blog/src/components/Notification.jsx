import ContextThing from "../reducers/notificationReducer";
import { useContext } from "react";
const Notification = () => {
  const [stuff] = useContext(ContextThing);
  if (!stuff || !stuff.message) {
    console.log("HELLo", stuff);
    return null;
  }
  console.log("mmm");
  console.log("sss", stuff);

  const style = {
    backgroundColor: "lightgrey",
    margin: "10px",
    padding: "10px",
    border: "2px solid",
    borderColor: stuff.type === "success" ? "green" : "red",
    borderRadius: "5px",
  };

  return <div style={style}>{stuff.message}</div>;
};

export default Notification;
