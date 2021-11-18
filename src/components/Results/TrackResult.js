import './TrackResult.scss'
import { useDataLayerValue } from '../../store/DataLayer'
import { FormatTracks } from '../../store/FormatData'
import useGoToSelection from '../../hooks/useGoToSelection'

const Track = ({ track }) => {
	const [{ spotify }, dispatch] = useDataLayerValue()
	const { goToArtist, goToAlbum } = useGoToSelection()

	const handlePlay = async (e) => {
		if (e.target.className === 'artist-link') return goToArtist(track.artist.id)
		if (e.target.className === 'album-link') return goToAlbum(track.album)

		const trackRadioData = await spotify.getRecommendations({
			min_energy: 0.4,
			seed_artists: [track.artist.id],
			min_popularity: 10,
		})
		const trackRadio = await FormatTracks(trackRadioData.body.tracks)

		await dispatch({
			type: 'SET_QUEUE',
			queue: { tracks: [track, ...trackRadio] },
		})
		await dispatch({
			type: 'SET_PLAY',
			isPlaying: true,
		})
	}

	return (
		<div className='card' onClick={handlePlay} key={track.uri}>
			<img src={track.album.cover.small} alt='' />
			<div className='track-meta'>
				<h4 className='album-link'>{track.track.name}</h4>
				<p className='artist-link'>{track.artist.name}</p>
			</div>
		</div>
	)
}

export default Track
