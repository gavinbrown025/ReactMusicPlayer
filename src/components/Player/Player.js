import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SpotifyPlayer from 'react-spotify-web-playback'
import './Player.scss'

import { useDataLayerValue } from '../../store/DataLayer'

const Player = ({ accessToken, trackUri }) => {
    const [{ token }, dispatch] = useDataLayerValue()

	const [play, setPlay] = useState(false)
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState('')

    useEffect(() => {
		if (!playingTrack) return
		axios
			.get('http://localhost:5000/lyrics', {
				params: {
					track: playingTrack.title,
					artist: playingTrack.artist,
				},
			})
			.then((res) => {
				setLyrics(res.data.lyrics)
			})
	}, [playingTrack])

	const chooseTrack = (track) => {
		setPlayingTrack(track)
		setLyrics()
	}

	useEffect(() => {
		setPlay(true)
	}, [trackUri])

	if (!accessToken) return null
	return (
		<div className='player'>
			<SpotifyPlayer
				token={accessToken}
				showSaveIcon
				callback={(state) => {
					if (!state.isPlaying) setPlay(false)
				}}
				uris={trackUri ? [trackUri] : []}
				play={play}
			/>
		</div>
	)
}

export default Player
