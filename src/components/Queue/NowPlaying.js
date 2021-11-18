import { useDataLayerValue } from '../../store/DataLayer'
import { useState } from 'react'
import LargePlayer from './LargePlayer'

import QueueItem from './QueueItem'

const NowPlaying = () => {
	const [{ currentlyPlaying }] = useDataLayerValue()
	const [isLargePlayer, setIsLargePlayer] = useState(true)

	return (
		<>
			{!isLargePlayer ? (
				<div className='now-playing'>
					<h2>Queue</h2>
					<h3>Now Playing</h3>
					<QueueItem index={null} track={currentlyPlaying} />
				</div>
			) : (
				<LargePlayer index={null} track={currentlyPlaying} />
			)}
		</>
	)
}

export default NowPlaying
