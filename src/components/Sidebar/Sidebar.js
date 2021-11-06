import { useDataLayerValue } from '../../store/DataLayer'


import Nav from './Nav'
import MyPlaylists from './MyPlaylists'
import PlayerPreview from './PlayerPreview'

import './Sidebar.scss'

const Sidebar = () => {
    const [{ currentlyPlaying }] = useDataLayerValue()
    return (
        <div className='sidebar'>
          <Nav />
          <MyPlaylists />
          {currentlyPlaying.track.id && <PlayerPreview />}
        </div>
    )
}

export default Sidebar
