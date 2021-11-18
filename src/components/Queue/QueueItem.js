import React, { useState, useEffect } from 'react'
import { useDataLayerValue } from '../../store/DataLayer'
import useGoToSelection from '../../hooks/useGoToSelection'

const compareString = (text1, text2) => {
	return text1.localeCompare(text2, undefined, { sensitivity: 'base' }) === 0
}

const QueueItem = ({ track, index, showLess, type, selectedQueue }) => {
	const [{ currentlyPlaying }, dispatch] = useDataLayerValue()
	const [isCurrent, setIsCurrent] = useState('')
	const { goToArtist, goToAlbum } = useGoToSelection()

	const styles = `queue-item ${isCurrent} ${index > 4 && showLess ? 'show-less' : ''} ${type}`

	useEffect(() => {
		if (compareString(currentlyPlaying.track.name, track.track.name) && compareString(currentlyPlaying.artist.name, track.artist.name)) {
			setIsCurrent('is-playing')
		}
		return () => setIsCurrent('')
	}, [currentlyPlaying, track.artist.name, track.track.name])

	const handleSelection = (e) => {
		if (e.target.className === 'album-link') return goToAlbum(track.album)
		if (e.target.className === 'artist-link') return goToArtist(track.artist.id)
		handlePlay()
	}

	const handlePlay = async () => {
		if (index === null) return // SO YOU CANT CLICK ON CURRENTLY PLAYING
		if (type !== 'queue') {
			return dispatch({
				type: 'SET_QUEUE',
				queue: { tracks: selectedQueue.tracks },
				offset: index,
			})
		}
		dispatch({
			type: 'SET_PLAYER_OFFSET',
			playerOffset: index,
		})

		//! try to make it change tracks when paused
		// seems to be a glitch in the npm package
	}

	return (
		<li onClick={handleSelection} className={styles}>
			<div className='track-meta'>
				{type !== 'album' ? <img src={track.album.cover.thumb} alt='' /> : <div className='track-number'>{index + 1}</div>}
				<div className='track-name'>
					<h4>{track.track.name}</h4>
					{type !== 'artist' && <p className='artist-link'>{track.artist.name}</p>}
				</div>
			</div>
			<div className='album-link'>{track.album.name}</div>
			<div className='track-duration'>{track.track.duration}</div>
		</li>
	)
}

export default QueueItem
