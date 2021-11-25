import { useDataLayerValue } from '../../store/DataLayer'

import Logo from './Logo'
import Nav from './Nav'
import MyPlaylists from './MyPlaylists'
import PlayerPreview from './PlayerPreview'

import './Sidebar.scss'

const Sidebar = () => {
	const [{ currentlyPlaying, showMenu }] = useDataLayerValue()

	return (
		<div className={`sidebar ${showMenu && 'show-menu'} `}>
			<Logo style={'home'} />
			<Nav />
			<MyPlaylists />
			{currentlyPlaying.track.id && <PlayerPreview />}
		</div>
	)
}

export default Sidebar
