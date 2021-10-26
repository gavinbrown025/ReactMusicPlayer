import { useState, useEffect } from 'react'
import './SearchForm.scss'

const SearchForm = ({ spotifyApi, setSearchResults, setShowSearch }) => {
	const [search, setSearch] = useState('')
	const [foundTracks, setFoundTracks] = useState()
	const [foundArtists, setFoundArtists] = useState()
	const [foundAlbums, setFoundAlbums] = useState()

	useEffect(() => {
		setSearchResults({
			tracks: foundTracks || 'No Tracks Found',
			artists: foundArtists || 'No Artists Found',
			albums: foundAlbums || 'No Albums Found',
		})
	}, [foundTracks, foundArtists, foundAlbums])

	const sortImageSize = (images) => {
		if (images.length < 2) {
			let setImages = [{ url: null }, { url: null }, { url: null }]
			return setImages
		}
		return images.sort((a, b) => a.height - b.height)
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		setShowSearch(true)

		if (!search.length) return

		spotifyApi.searchTracks(search).then((res) => {
			if (res.body.tracks.items.length === 0) {
				return setFoundTracks('No Tracks Found')
			}
			setFoundTracks(
				res.body.tracks.items.map((track) => {
					const albumCovers = sortImageSize(track.album.images)
					return {
						track: {
							name: track.name,
							uri: track.uri,
						},
						artist: {
							name: track.artists[0].name,
							uri: track.artists[0].uri,
						},
						album: {
							name: track.album.name,
							uri: track.album.uri,
							cover: {
								thumb: albumCovers[0].url,
								small: albumCovers[1].url,
								large: albumCovers[2].url,
							},
						},
					}
				})
			)
		})

		spotifyApi.searchArtists(search).then((res) => {
			if (res.body.artists.items.length === 0) {
				return setFoundArtists('No Artists Found')
			}
			setFoundArtists(
				res.body.artists.items.map((artist) => {
					const artistImages = sortImageSize(artist.images)
					return {
						id: artist.id,
						name: artist.name,
						uri: artist.uri,
						cover: {
							thumb: artistImages[0].url,
							small: artistImages[1].url,
							large: artistImages[2].url,
						},
					}
				})
			)
		})

		spotifyApi.searchAlbums(search).then((res) => {
			if (res.body.albums.items.length === 0) {
				return setFoundAlbums('No Albums Found')
			}
			setFoundAlbums(
				res.body.albums.items.map((album) => {
					const albumCovers = sortImageSize(album.images)
					return {
						id: album.id,
						name: album.name,
						uri: album.uri,
						cover: {
							thumb: albumCovers[0].url,
							small: albumCovers[1].url,
							large: albumCovers[2].url,
						},
						artist: {
							id: album.artists[0].id,
							name: album.artists[0].name,
						},
					}
				})
			)
		})
	}

	return (
		<div className='container'>
			<form className='search-form' onSubmit={onSubmitHandler}>
				<input type='text' onChange={(e) => setSearch(e.target.value)} />
				<button type='submit'>Search</button>
			</form>
		</div>
	)
}

export default SearchForm
