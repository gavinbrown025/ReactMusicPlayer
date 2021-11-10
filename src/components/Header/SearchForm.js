import { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useDataLayerValue } from '../../store/DataLayer'
import { FormatTracks, FormatArtists, FormatAlbums } from '../../store/FormatData'

import { SearchSvg } from '../Icons/Icons'
import './SearchForm.scss'

const SearchForm = () => {
	const history = useHistory()
	const [{ spotify, searchResults, focusSearch }, dispatch] = useDataLayerValue()
	const [search, setSearch] = useState('')
	const searchInputRef = useRef()

	focusSearch && searchInputRef.current.focus()

	const blockSubmit = (e) => e.preventDefault()

	useEffect(() => {
		if (search === '') {
			dispatch({
				type: 'SET_SEARCH_RESULTS',
				searchResults: {
					tracks: [],
					artists: [],
					albums: [],
				},
			})
			return history.push('/')
		}
		history.push('/search')
		getContent()
	}, [search])

	const getContent = async () => {
		dispatch({
			type: 'SET_SEARCH_RESULTS',
			searchResults: {
				tracks: await searchTracks(),
				artists: await searchArtists(),
				albums: await searchAlbums(),
			},
		})
	}

	const searchTracks = async () => {
		const res = await spotify.searchTracks(search)
		if ((await res.body.tracks.items.length) === 0) return []
		return await FormatTracks(res.body.tracks.items)
	}

	const searchArtists = async () => {
		const res = await spotify.searchArtists(search)
		if ((await res.body.artists.items.length) === 0) return []
		return await FormatArtists(res.body.artists.items)
	}

	const searchAlbums = async () => {
		const res = await spotify.searchAlbums(search)
		if ((await res.body.albums.items.length) === 0) return []
		return await FormatAlbums(res.body.albums.items)
	}

	return (
		<form className='search-form' onSubmit={blockSubmit}>
			<Link to={searchResults.tracks.length > 0 ? 'search' : '/'}>
				<input
					ref={searchInputRef}
					onBlur={() => dispatch({ type: 'SET_FOCUS_SEARCH', focusSearch: false })}
					type='text'
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Search Songs, Artists, and Albums'
				/>
				<SearchSvg />
			</Link>
		</form>
	)
}

export default SearchForm
