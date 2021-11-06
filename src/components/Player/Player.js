import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SpotifyPlayer from 'react-spotify-web-playback'
import './Player.scss'

import { useDataLayerValue } from '../../store/DataLayer'
import FormatData from '../../store/FormatData'

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
	const [lyrics, setLyrics] = useState('')

	useEffect(() => {
		if (!currentlyPlaying) return
		axios
			.get('http://localhost:5000/lyrics', {
				params: {
					track: currentlyPlaying.name,
					artist: currentlyPlaying.artists,
				},
			})
			.then((res) => {
				setLyrics(res.data.lyrics)
			})
	}, [currentlyPlaying])

    console.log(playerOffset)

	const playerCallback = async (state) => {
        console.log(state)
        dispatch({
            type: 'SET_PLAY',
            isPlaying: state.isPlaying,
        })

        if (!currentlyPlaying.track.id) return
        if (state.type === 'track_update') {
            const newCurrentData = await spotify.getTracks([state.track.id])
            const newCurrentTrack = await FormatData({
				type: 'FORMAT_TRACKS',
				data: newCurrentData.body.tracks,
			})
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
