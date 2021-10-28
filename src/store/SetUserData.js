import { useDataLayerValue } from './DataLayer'
import { useEffect } from 'react'

const SetUserData = () => {
	const [{ token, spotify }, dispatch] = useDataLayerValue()

	const sortImageSize = (images) => {
		if (images.length < 2) {
			let setImages = [{ url: null }, { url: null }, { url: null }]
			return setImages
		}
		return images.sort((a, b) => a.height - b.height)
	}

	useEffect(async () => {
		if (!token.accessToken) return
		spotify.setAccessToken(token.accessToken)

		const userData = await spotify.getMe()
		await dispatch({
			type: 'SET_USER',
			user: {
				id: userData.body.id,
				name: userData.body.display_name,
				image: userData.body.images[0].url,
			},
		})

		const playlists = await spotify.getUserPlaylists(userData.id)
		await dispatch({
			type: 'SET_PLAYLISTS',
			myPlaylists: playlists.body.items,
		})

		const trackData = await spotify.getMyTopTracks()
		const topTracks = trackData.body.items.map((track) => {
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

		const artistData = await spotify.getMyTopArtists()
		const topArtists = await artistData.body.items.map((artist) => {
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

		await dispatch({
			type: 'SET_RECOMMENDED',
			recommended: {
				tracks: topTracks,
				artists: topArtists,
			},
		})
	}, [token.accessToken])
}

export default SetUserData
