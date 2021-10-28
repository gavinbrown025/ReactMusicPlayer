import { useDataLayerValue } from '../../store/DataLayer'

const MyPlaylists = () => {
	const [{ myPlaylists }] = useDataLayerValue()
	return (
		<div className='my-playlists'>
			<ul>
				{myPlaylists.map((playlist) => (
					<li>{playlist.name}</li>
				))}
			</ul>
		</div>
	)
}

export default MyPlaylists
