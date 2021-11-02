import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useDataLayerValue } from '../../store/DataLayer'
import FormatData from '../../store/FormatData'

import { SearchSvg } from '../Icons/Icons'
import './SearchForm.scss'

const SearchForm = () => {
	const [{spotify}, dispatch] = useDataLayerValue()

	const [search, setSearch] = useState('')
	const [foundTracks, setFoundTracks] = useState([])
	const [foundArtists, setFoundArtists] = useState([])
	const [foundAlbums, setFoundAlbums] = useState([])

	useEffect(() => {
		dispatch({
			type: 'SET_SEARCH_RESULTS',
			searchResults: {
				tracks: foundTracks,
				artists: foundArtists,
				albums: foundAlbums,
			},
		})
	}, [foundTracks, foundArtists, foundAlbums, dispatch])

	const onSubmitHandler = (e) => {
		e.preventDefault()
		if (!search.length) return

		spotify.searchTracks(search).then((res) => {
			if (res.body.tracks.items.length === 0) return
			spotify.searchTracks(search).then((res) => {
                if (res.body.tracks.items.length === 0) return
                setFoundTracks(
                    FormatData({
                        type: 'FORMAT_TRACKS',
                        data: res.body.tracks.items,
                    })
                )
            })
		})

		spotify.searchArtists(search).then((res) => {
			if (res.body.artists.items.length === 0) return
			setFoundArtists(
				FormatData({
                    type: 'FORMAT_ARTISTS',
                    data: res.body.artists.items,
                })
			)
		})

		spotify.searchAlbums(search).then((res) => {
			if (res.body.albums.items.length === 0) return
			setFoundAlbums(
                FormatData({
                    type: 'FORMAT_ALBUMS',
                    data: res.body.albums.items,
                })
			)
		})
	}

	return (
		<form className='search-form' onSubmit={onSubmitHandler}>
			<Link to={'search'}>
				<input type='text' onChange={(e) => setSearch(e.target.value)} />
				<SearchSvg onSubmitHandler={onSubmitHandler}/>
			</Link>
		</form>
	)
}

export default SearchForm
