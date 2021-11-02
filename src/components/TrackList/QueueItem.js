import { useDataLayerValue } from '../../store/DataLayer'
import React, { useState, useEffect } from 'react'
import './QueueItem.scss'

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
		dispatch({
      type: 'SET_PLAYER_OFFSET',
      playerOffset: index,
    })
	}
	return (
		<li onClick={handlePlay} className={`queue-item ${isCurrent}`}>
			{track.track.name}
		</li>
	)
}

export default QueueItem
