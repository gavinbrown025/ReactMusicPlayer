import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { useDataLayerValue } from '../../store/DataLayer'

const Nav = () => {
	const [{ searchResults }, dispatch] = useDataLayerValue()
	const [hasResults, setHasResults] = useState(false)

	useEffect(() => {
		if (searchResults.tracks.length || searchResults.artists.length || searchResults.albums.length) {
			setHasResults(true)
		}
		return () => {
			setHasResults(false)
		}
	}, [searchResults])

	const onFocusSearch = () => {
		dispatch({ type: 'SET_FOCUS_SEARCH', focusSearch: true })
	}

	return (
		<nav>
			<ul>
				<Link to={'/'}>
					<li>Home</li>
				</Link>
				<Link to={{ pathname: 'queue', state: 'queue' }}>
					<li>Queue</li>
				</Link>
				<Link to={hasResults ? 'search' : '/'} onClick={onFocusSearch}>
					<li>Search</li>
				</Link>
			</ul>
		</nav>
	)
}

export default Nav
