import { useHistory } from 'react-router-dom'

import { FormatTracks, FormatAlbums, FormatArtists } from '../store/FormatData'
import { useDataLayerValue } from '../store/DataLayer'

const useGoToSelection = () => {
	const history = useHistory()
	const [{ spotify }, dispatch] = useDataLayerValue()

	const goToArtist = async (id) => {
        const results = await Promise.all([
            spotify.getArtist(id),
            spotify.getArtistTopTracks(id, 'CA'),
            spotify.getArtistAlbums(id),
        ])

		const artistSelection = FormatArtists([results[0].body])
		const artistTopTracks = FormatTracks(results[1].body.tracks)
		const artistAlbums = FormatAlbums(results[2].body.items)

		dispatch({
			type: 'SET_ARTIST',
			selectedArtist: {
				data: artistSelection[0],
				tracks: artistTopTracks,
				albums: artistAlbums,
			},
		})
		history.push({ pathname: 'artist', state: 'artist' })
	}

	const goToAlbum = async (album) => {
		const albumSongsData = await spotify.getAlbumTracks(album.id)
		const preFormat = await albumSongsData.body.items.map((track) => ({
			...track,
			album: {
				id: album.id,
				name: album.name,
				uri: album.uri,
				images: [
					{ url: album.cover.thumb, height: 1 },
					{ url: album.cover.small, height: 2 },
					{ url: album.cover.large, height: 3 },
				],
			},
		}))

		const albumSongs = FormatTracks(preFormat)
		dispatch({
			type: 'SET_SELECTED_QUEUE',
			selectedQueue: {
				tracks: albumSongs,
				data: {
					name: album.name,
					image: album.cover.small,
					author: album.artist.name,
					releaseDate: album.releaseDate,
					totalTracks: album.totalTracks,
				},
			},
		})
		history.push({ pathname: 'queue', state: 'album' })
	}

	return { goToArtist, goToAlbum }
}

export default useGoToSelection
