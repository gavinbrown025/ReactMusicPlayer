import { useDataLayerValue } from '../../store/DataLayer'

const MyPlaylists = () => {
	const [{ myPlaylists }] = useDataLayerValue()
	return (
		<div className='my-playlists'>
			<ul>
				{myPlaylists.map((playlist) => (
					<li key={playlist.uri}>{playlist.name}</li>
				))}
			</ul>
		</div>
	)
}

export default MyPlaylists
