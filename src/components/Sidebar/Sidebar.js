import Nav from './Nav'
import MyPlaylists from './MyPlaylists'
import PlayerPreview from './PlayerPreview'

import './Sidebar.scss'

const Sidebar = () => {
    return (
        <div className='sidebar'>
          <Nav />
          <MyPlaylists />
          <PlayerPreview />
        </div>
    )
}

export default Sidebar
