import { Link } from 'react-router-dom'

const Nav = () => {
	return (
		<nav>
			<ul>
				<Link to={'/'}>
					<li>Home</li>
				</Link>
				<Link to={'queue'}>
					<li>Queue</li>
				</Link>
				<Link to={'search'}>
					<li>Search</li>
				</Link>
			</ul>
		</nav>
	)
}

export default Nav
