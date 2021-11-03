import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'
import SetUserData from '../../store/SetUserData'

import './Dashboard.scss'

import Search from '../Routes/SearchView'
import Home from '../Routes/HomeView'
import Queue from '../Queue/QueueView'

import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Logo from '../Logo/Logo'

import Player from '../Player/Player'


const Dashboard = ({ code }) => {
	useAuth(code)
    SetUserData()

	return (
		<Router>
			<div className='grid-container'>
                <Logo />
				<Header />
				<Sidebar />
				<main className='main-content-con'>
					<Switch>
						<Route component={Home} path='/' exact/>
						<Route component={Search} path='/search' />
						<Route component={Queue} path='/queue' />
						{/* <PlayLists /> */}
						{/* <Artist /> */}
					</Switch>
				</main>
				<Player />
			</div>
		</Router>
	)
}

export default Dashboard
