import ReactDOM from 'react-dom/client'
import { configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/store'
const store = configureStore({reducer})
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)