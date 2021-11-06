import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useDataLayerValue } from '../../store/DataLayer'
import FormatData from '../../store/FormatData'

import { SearchSvg } from '../Icons/Icons'
import './SearchForm.scss'

const SearchForm = () => {
	const history = useHistory()
	const [{ spotify, searchResults }, dispatch] = useDataLayerValue()
	const [search, setSearch] = useState('')
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
		return await FormatData({
			type: 'FORMAT_TRACKS',
			data: res.body.tracks.items,
		})
	}
	const searchArtists = async () => {
		const res = await spotify.searchArtists(search)
		if ((await res.body.artists.items.length) === 0) return []
		return await FormatData({
			type: 'FORMAT_ARTISTS',
			data: res.body.artists.items,
		})
	}
	const searchAlbums = async () => {
		const res = await spotify.searchAlbums(search)
		if ((await res.body.albums.items.length) === 0) return []
		return await FormatData({
			type: 'FORMAT_ALBUMS',
			data: res.body.albums.items,
		})
	}

	return (
		<form className='search-form' onSubmit={blockSubmit}>
			<Link to={searchResults.tracks.length > 0 ? 'search' : '/'}>
				<input type='text' onChange={(e) => setSearch(e.target.value)} placeholder='Search Songs, Artists, and Albums' />
				<SearchSvg />
			</Link>
		</form>
	)
}

export default SearchForm
