import './styles/App.scss'

import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'

//* looks in the search bar for the value after 'code'
const code = new URLSearchParams(window.location.search).get('code')

function App() {
	return code ? <Dashboard code={code} /> : <Login/>
}

export default App
