import { useImperativeHandle, useState, forwardRef } from "react"
const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const m = () => {
        setVisible(false)
    }

    useImperativeHandle(refs, () => {
        return {
        m
        }
    })
    if (visible) {
        return (
            <div>
            {props.children}
            { props.text2 && <button onClick={() => setVisible(false)}>{props.text2}</button>}
            </div>
        )
    } else {
        return (
            <div>
            {props.extratext}
            <button onClick={() => setVisible(true)}>{props.text}</button>
            </div>
        )
    }
})

export default Togglable 