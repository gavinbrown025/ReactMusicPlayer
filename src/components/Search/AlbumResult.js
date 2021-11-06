import FormatData from '../../store/FormatData'
import { useDataLayerValue } from '../../store/DataLayer'
import { useHistory } from 'react-router-dom'
const AlbumResult = ({ album }) => {
	const [{ spotify }, dispatch] = useDataLayerValue()
	const history = useHistory()

	const handleSelection = async () => {
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
		const albumSongs = await FormatData({
			type: 'FORMAT_TRACKS',
			data: preFormat,
		})
		await dispatch({
			type: 'SET_SELECTED_ALBUM',
			selectedAlbum: {
				tracks: albumSongs,
		        data: {
		            name: album.name,
		            image: album.cover.small,
		            author: album.artist.name,
		            releaseDate: album.releaseDate,
		            totalTracks: album.totalTracks
		        },
			},
		})
		history.push({pathname:'queue', state: 'album'})
	}

	return (
		<div className='card' onClick={handleSelection} key={album.id}>
			<img src={album.cover.small} alt='' />
			<div className='track-meta'>
				<h4>{album.name}</h4>
				<p>{album.artist.name}</p>
			</div>
		</div>
	)
}

export default AlbumResult
