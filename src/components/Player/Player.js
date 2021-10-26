import React, { useState, useEffect } from 'react'

import SpotifyPlayer from 'react-spotify-web-playback'
import './Player.scss'

const Player = ({ accessToken, trackUri }) => {
	const [play, setPlay] = useState(false)

	useEffect(() => {
		setPlay(true)
	}, [trackUri])

	if (!accessToken) return null
	return (
		<div className='main-player'>
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
