import { useContext } from 'react'
import CounterContext from './CounterContext'
import Button from './Button'
import Display from './Display'
const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
      <div>
      <Display />
      <div>
        <Button  type='INC' label='+'/>
        <Button  type='DEC' label='-'/>
        <Button  type='ZERO' label='0'/>
    </div>
    </div>
  )
}

export default App