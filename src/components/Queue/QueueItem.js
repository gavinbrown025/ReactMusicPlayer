import { useDataLayerValue } from '../../store/DataLayer'
import React, { useState, useEffect } from 'react'

const QueueItem = ({ track, index, showLess, type, selectedQueue}) => {
	const [{ currentlyPlaying, queue, selectedArtist, selectedAlbum }, dispatch] = useDataLayerValue()
	const [isCurrent, setIsCurrent] = useState('')

    const styles = `queue-item ${isCurrent} ${index > 4 && showLess ? 'show-less' : ''}`

	useEffect(() => {
        if (currentlyPlaying.track.id === track.track.id) {
            setIsCurrent('is-playing')
		}
		return () => {
            setIsCurrent('')
		}
	}, [currentlyPlaying])

	const handlePlay = async () => {
		if (index === null) return
        if(type === 'artist'){
            return dispatch({
                type: 'SET_QUEUE',
                queue: {
                    tracks: selectedArtist.tracks
                },
                offset: index
            })
        }
		dispatch({
			type: 'SET_PLAYER_OFFSET',
			playerOffset: index,
		})

        //! try to make it change tracks when paused
	}

	return (
		<li onClick={handlePlay} className={styles}>
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
