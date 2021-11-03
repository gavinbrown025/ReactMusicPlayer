import { useDataLayerValue } from '../../store/DataLayer'
import FormatData from '../../store/FormatData'


const PlayListItem = ({ playlist, index }) => {
	const [{ spotify }, dispatch] = useDataLayerValue()

	const getPlaylistTracks = async () => {
		const playlistSongsData = await spotify.getPlaylistTracks(playlist.id, {
			limit: 100,
			fields: 'items',
		})
    const preFormat = playlistSongsData.body.items.map(item => {
      return item.track
    })
    const playlistSongs = await FormatData({
      type: 'FORMAT_TRACKS',
      data: preFormat
    })
    await dispatch({
      type: 'SET_QUEUE',
      queue: {
        name: playlist.name,
        type: 'playlist',
        tracks: playlistSongs,
        image: playlist.images[1].url,
        author: playlist.owner.display_name,
        description: playlist.description,
      },
      play: false,
    })

	}

	return <li onClick={getPlaylistTracks}>{playlist.name}</li>
}

export default PlayListItem
