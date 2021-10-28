const PlaylistsView = ({playingTrack}) => {
    return (
        <div>
            {(playingTrack) && <div className='lyrics'>{lyrics}</div>}
        </div>
    )
}

export default PlaylistsView

