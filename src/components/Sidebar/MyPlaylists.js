import { useDataLayerValue } from '../../store/DataLayer'

import PlaylistItem from './PlayListItem'

const MyPlaylists = () => {
	const [{ myPlaylists }] = useDataLayerValue()

    return (
		<div className='my-playlists'>
			<ul>
				{myPlaylists.map((playlist, index) => (
					<PlaylistItem playlist={playlist} index={index} key={playlist.uri}/>
				))}
			</ul>
		</div>
	)
}

export default MyPlaylists
