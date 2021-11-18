import { useDataLayerValue } from '../../store/DataLayer'
import { Link } from 'react-router-dom'

import {FormatTracks} from '../../store/FormatData'

const PlayListItem = ({ playlist }) => {
	const [{ spotify }, dispatch] = useDataLayerValue()

	const getPlaylistTracks = async () => {
		const playlistSongsData = await spotify.getPlaylistTracks(playlist.id, {
			limit: 100,
			fields: 'items',
		})
		const preFormat = await playlistSongsData.body.items.map((item) => {
			return item.track
		})
		const playlistSongs = FormatTracks(await preFormat)

		dispatch({
			type: 'SET_SELECTED_QUEUE',
			selectedQueue: {
				tracks: await playlistSongs,
				data: {
					name: playlist.name,
					image: playlist.images[1].url,
					author: playlist.owner.display_name,
					description: playlist.description,
				},
			},
		})
	}

	return (
		<Link to={{ pathname: 'queue', state: 'playlist' }}>
			<li onClick={getPlaylistTracks}>{playlist.name}</li>
		</Link>
	)
}

export default PlayListItem
