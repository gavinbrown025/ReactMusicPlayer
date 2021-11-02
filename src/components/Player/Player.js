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
    const [queueUris, setQueueUris] = useState([])

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

    useEffect(() => {
        setQueueUris(queue.tracks.map((track) => track.track.uri))
    }, [queue])

	const playerCallback = async (state) => {
		!state.isPlaying && dispatch({
			type: 'SET_PLAY',
			isPlaying: false,
		})
        if (!currentlyPlaying.track.id || !state.track.id) return
		if (currentlyPlaying.track.id !== state.track.id) {
            console.log('track change')
            const newCurrentData = await spotify.getTracks([state.track.id])
            const newCurrentTrack = FormatData({
				type: 'FORMAT_TRACKS',
				data: newCurrentData.body.tracks,
			})
			dispatch({
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
                showSaveIcon
                uris={queueUris}
                play={isPlaying}
                callback={(state) => playerCallback(state)}
                styles={styles}
                offset={playerOffset}
            />
		</div>
	)
}

// offset={currentlyPlaying.index}
export default Player
