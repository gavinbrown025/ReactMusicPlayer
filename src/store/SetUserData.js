import { useDataLayerValue } from './DataLayer'
import { useEffect } from 'react'
import { FormatTracks, FormatArtists } from './FormatData'

const SetUserData = () => {
	const [{ token, spotify }, dispatch] = useDataLayerValue()

	const setData = async () => {
		const userData = await spotify.getMe()
		const dataSet = await Promise.all([getPlaylists(userData.body.id), getRecents(), getRecommended()])

		dispatch({
			type: 'SET_INITIAL',
			user: {
				id: await userData.body.id,
				name: await userData.body.display_name,
				image: await userData.body.images[0].url,
			},
			myPlaylists: await dataSet[0],
			recents: await dataSet[1],
			recommended: await dataSet[2],
		})
	}

	useEffect(() => {
		if (!token.accessToken) return
		spotify.setAccessToken(token.accessToken)
		setData()
	}, [token.accessToken])

	const getPlaylists = async (id) => {
		const playlists = await spotify.getUserPlaylists(id)
		return await playlists.body.items
	}

	const getRecents = async () => {
		const recentSongData = await spotify.getMyRecentlyPlayedTracks({ limit: 1 })
		const mostRecentSongRadioData = await spotify.getRecommendations({
			min_energy: 0.4,
			seed_artists: [recentSongData.body.items[0].track.artists[0].id],
			min_popularity: 10,
		})
		return FormatTracks([recentSongData.body.items[0].track, ...mostRecentSongRadioData.body.tracks])
	}

	//* down on spotify's end 11/16
	const getRecommended = async () => {
		try {
			const trackData = await spotify.getMyTopTracks()
			const artistData = await spotify.getMyTopArtists()
			const recommendedData = await spotify.getRecommendations({
				min_energy: 0.4,
				seed_artists: [artistData.body.items[0].id, artistData.body.items[1].id],
				min_popularity: 10,
			})
			const topTracks = FormatTracks(await trackData.body.items)
			const topArtists = FormatArtists(await artistData.body.items)
			const recommendedSongs = FormatTracks(await recommendedData.body.tracks)

			return {
				tracks: await topTracks,
				artists: await topArtists,
				recommended: await recommendedSongs,
			}
		} catch (err) {
            console.error('error in reccomended items')
			return {
				tracks: [],
				artists: [],
				recommended: [],
			}
		}
	}
}

export default SetUserData
