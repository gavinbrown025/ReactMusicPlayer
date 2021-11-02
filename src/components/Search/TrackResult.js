import './TrackResult.scss'
import { useDataLayerValue } from '../../store/DataLayer'
import FormatData from '../../store/FormatData'

const Track = ({ track }) => {
	const [{ spotify }, dispatch] = useDataLayerValue()

	const handlePlay = async () => {
		const trackRadioData = await spotify.getRecommendations({
			min_energy: 0.4,
			seed_artists: [track.artist.id],
			min_popularity: 10,
		})

		const trackRadio = FormatData({
			type: 'FORMAT_TRACKS',
			data: trackRadioData.body.tracks,
		})

		dispatch({
			type: 'SET_QUEUE',
			queue: {
				type: 'relative',
				tracks: [track, ...trackRadio],
			},
		})
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
