import ReactDOM from 'react-dom/client'
import App from './App'
import { BlogProvider } from './components/BlogContext'
import { UserProvider } from './components/UserContext'
import { WordsProvider } from './components/WordsContext'
import { MaybeProvider } from './components/MaybeContext'

ReactDOM.createRoot(document.getElementById('root')).render(<MaybeProvider><WordsProvider><UserProvider><BlogProvider><App /></BlogProvider></UserProvider></WordsProvider></MaybeProvider>)