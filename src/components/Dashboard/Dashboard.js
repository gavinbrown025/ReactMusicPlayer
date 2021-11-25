import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import useMediaQuery from '../../hooks/useMediaQuery'
import SetUserData from '../../store/SetUserData'

import './Dashboard.scss'

import Search from '../Routes/SearchView'
import Home from '../Routes/HomeView'
import Queue from '../Queue/QueueView'
import Artist from '../Artist/ArtistView'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

import Player from '../Player/Player'

import { useDataLayerValue } from '../../store/DataLayer'
const Dashboard = ({ code }) => {
	const [{ showMenu }, dispatch] = useDataLayerValue()
	useAuth(code)
	SetUserData()

	const hideMenu = () => {
		showMenu && dispatch({ type: 'SET_SHOW_MENU' })
	}

	return (
		<Router>
			<div className='grid-container'>
				<Header />
				<Sidebar />
				<main className='main-content-con'>
					<Switch>
						<Route component={Home} path='/' exact />
						<Route component={Search} path='/search' />
						<Route component={Queue} path='/queue' />
						<Route component={Artist} path='/artist' />
					</Switch>
				</main>
				<Player />
				<div onClick={hideMenu} className={`menu-overlay ${showMenu && 'show'}`}></div>
			</div>
		</Router>
	)
}

export default Dashboard
