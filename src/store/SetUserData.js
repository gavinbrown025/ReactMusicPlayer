import { useDataLayerValue } from './DataLayer'
import { useEffect } from 'react'
import FormatData from './FormatData'

const SetUserData = () => {
	const [{ token, spotify }, dispatch] = useDataLayerValue()

	useEffect(() => {
		if (!token.accessToken) return
		spotify.setAccessToken(token.accessToken)

		const setData = async () => {
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
			const topTracks = FormatData({
				type: 'FORMAT_TRACKS',
				data: trackData.body.items,
			})

			const artistData = await spotify.getMyTopArtists()
            console.log(artistData)
			const topArtists = FormatData({
				type: 'FORMAT_ARTISTS',
				data: artistData.body.items,
			})

			const recommendedData = await spotify.getRecommendations({
				min_energy: 0.4,
				seed_artists: [topArtists[0].id, topArtists[1].id],
				min_popularity: 10,
			})
			const recommendedSongs = FormatData({
				type: 'FORMAT_TRACKS',
				data: recommendedData.body.tracks,
			})
			dispatch({
				type: 'SET_RECOMMENDED',
				recommended: {
					tracks: topTracks,
					artists: topArtists,
					recommended: recommendedSongs
				},
			})

            //* get most recent song and make a queue of reccomendations
            const recentSongData = await spotify.getMyRecentlyPlayedTracks({limit:1})
            const mostRecentSong = FormatData({
                type: 'FORMAT_TRACKS',
                data: [recentSongData.body.items[0].track]
            })

            const mostRecentSongRadioData = await spotify.getRecommendations({
                min_energy: 0.4,
                seed_artists: [mostRecentSong[0].artist.id],
                min_popularity: 10,
            })
            const mostRecentSongRadio = FormatData({
                type: 'FORMAT_TRACKS',
                data: mostRecentSongRadioData.body.tracks,
            })

            dispatch({
                type: 'SET_QUEUE',
                queue: {
                    type: 'relative',
                    tracks: [mostRecentSong[0], ...mostRecentSongRadio],
                }
            })
		}
		setData()
	}, [token.accessToken])
}

export default SetUserData
