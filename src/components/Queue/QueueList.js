import { useDataLayerValue } from '../../store/DataLayer'
import { useState } from 'react'

import QueueItem from './QueueItem'

const QueueList = ({ type, selectedQueue }) => {
	const [showLess, setShowLess] = useState(true)
    // console.log(selectedQueue)
	return (
		<div className='queue-list-con'>
			{type === 'artist' && (
				<div className='artist-popular'>
					<h3>Popular Tracks</h3>
					{showLess ? <button onClick={() => setShowLess(false)}>Show More</button> : <button onClick={() => setShowLess(true)}>Show Less</button>}
				</div>
			)}
			<div className='queue-list-header'>
				<h3>Track Name</h3>
				<h3>Album</h3>
				<h3>Length</h3>
			</div>
			<ul>
				{selectedQueue.tracks.length &&
					selectedQueue.tracks.map((track, index) =>
                    <QueueItem key={track.track.uri} showLess={type === 'artist' && showLess} type={type} index={index} track={track} />)}
			</ul>
		</div>
	)
}

export default QueueList
