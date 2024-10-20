import { useCounterValue } from '../CounterContext'
const Display = ({ counter }) => {
    const counter = useCounterValue()
    return <div>{counter}</div>
  }