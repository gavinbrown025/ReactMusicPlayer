import { useDataLayerValue } from '../../store/DataLayer'
import React, { useState, useEffect } from 'react'

const QueueItem = ({ track, index }) => {
	const [{ currentlyPlaying }, dispatch] = useDataLayerValue()
	const [isCurrent, setIsCurrent] = useState('')

	useEffect(() => {
		if (currentlyPlaying.track.id === track.track.id) {
			setIsCurrent('is-playing')
		}
		return () => {
			setIsCurrent('')
		}
	}, [currentlyPlaying])

	const handlePlay = () => {
		if (!index) return
		dispatch({
			type: 'SET_PLAYER_OFFSET',
			playerOffset: index,
		})
	}

	return (
		<li onClick={handlePlay} className={`queue-item ${isCurrent}`}>
			<div className='track-meta'>
				<img src={track.album.cover.thumb} alt='' />
				<div className='track-name'>
					<h4>{track.track.name}</h4>
					<p>{track.artist.name}</p>
				</div>
			</div>
			<div className='album-name'>{track.album.name}</div>
			<div className='track-duration'>{track.track.duration}</div>
		</li>
	)
}

export default QueueItem
