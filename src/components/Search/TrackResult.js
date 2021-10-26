import './TrackResult.scss'

const Track = ({ track, chooseTrack }) => {
	const handlePlay = () => {
		chooseTrack(track)
	}

	return (
		<div className='card' onClick={handlePlay} key={track.uri}>
			<img src={track.album.cover.small} alt='' />
			<div className='track-meta'>
				<h4>{track.track.name}</h4>
				<p>{track.artist.name}</p>
			</div>
		</div>
	)
}

export default Track

//  {/* get related tracks for queue*/}
// {/* add a click to show artist */}
