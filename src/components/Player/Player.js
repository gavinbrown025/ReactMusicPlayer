import SpotifyPlayer from 'react-spotify-web-playback'
import './Player.scss'

import { useDataLayerValue } from '../../store/DataLayer'
import { FormatTracks } from '../../store/FormatData'

const styles = {
	activeColor: 'red',
	bgColor: '#333',
	color: '#fff',
	loaderColor: '#1cb954',
	sliderColor: '#1cb954',
	trackArtistColor: '#ccc',
	trackNameColor: '#fff',
}

const Player = () => {
	const [{ spotify, token, queue, isPlaying, currentlyPlaying, playerOffset }, dispatch] = useDataLayerValue()

	const playerCallback = async (state) => {
		dispatch({
			type: 'SET_PLAY',
			isPlaying: state.isPlaying,
		})

		if (!currentlyPlaying.track.id) return
		if (state.type === 'track_update') {
			const newCurrentData = await spotify.getTracks([state.track.id])
			const newCurrentTrack = await FormatTracks(newCurrentData.body.tracks)
			await dispatch({
				type: 'SET_CURRENT_TRACK',
				currentlyPlaying: newCurrentTrack[0],
			})
		}
	}

	if (!token.accessToken) return null
	return (
		<div className='player'>
			<SpotifyPlayer
				token={token.accessToken}
				uris={queue.tracks.map((track) => track.track.uri)}
				play={isPlaying}
				callback={(state) => playerCallback(state)}
				offset={playerOffset}
				styles={styles}
				magnifySliderOnHover={true}
				showSaveIcon
			/>
		</div>
	)
}
export default Player
