import { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useDataLayerValue } from '../../store/DataLayer'
import { FormatTracks, FormatArtists, FormatAlbums } from '../../store/FormatData'

import { SearchSvg } from '../Icons/Icons'
import './SearchForm.scss'

const SearchForm = () => {
	const history = useHistory()
	const [{ spotify, searchResults, focusSearch }, dispatch] = useDataLayerValue()
	const [search, setSearch] = useState('')
	const searchInputRef = useRef()

	const blockSubmit = (e) => e.preventDefault()

	useEffect(() => {
		if (focusSearch) {
			searchInputRef.current.focus()
            if(searchResults.tracks.length > 0 || searchResults.artists.length > 0 || searchResults.albums.length > 0) history.push('/search')
		}
	}, [focusSearch])

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

    const searchTracks = async () => {
		const res = await spotify.searchTracks(search)
		if ((await res.body.tracks.items.length) === 0) return []
		return FormatTracks(await res.body.tracks.items)
	}

	const searchArtists = async () => {
		const res = await spotify.searchArtists(search)
		if ((await res.body.artists.items.length) === 0) return []
		return FormatArtists(await res.body.artists.items)
	}

	const searchAlbums = async () => {
		const res = await spotify.searchAlbums(search)
		if ((await res.body.albums.items.length) === 0) return []
		return FormatAlbums(await res.body.albums.items)
	}

	const getContent = async () => {
        const results = await Promise.all([
            searchTracks(),
			searchArtists(),
			searchAlbums(),
        ])
		dispatch({
			type: 'SET_SEARCH_RESULTS',
			searchResults: {
				tracks: await results[0],
				artists: await results[1],
				albums: await results[2],
			},
		})
	}

	return (
		<form className='search-form' onSubmit={blockSubmit}>
			<div>
				<input
					ref={searchInputRef}
                    onFocus={()=> dispatch({ type: 'SET_FOCUS_SEARCH', focusSearch: true })}
					onBlur={()=> focusSearch !== null && dispatch({ type: 'SET_FOCUS_SEARCH', focusSearch: false })}
					type='text'
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Search Songs, Artists, and Albums'
				/>
				<SearchSvg />
			</div>
		</form>
	)
}

export default SearchForm
