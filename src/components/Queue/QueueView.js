import { useDataLayerValue } from '../../store/DataLayer'
import { useEffect, useState } from 'react'

import './Queue.scss'

import QueueList from './QueueList'
import QueueHeader from './QueueHeader'
import NowPlaying from './NowPlaying'

const QueueView = ({ location }) => {
	const [{ queue, selectedQueue }] = useDataLayerValue()
	const [currentQueue, setCurrentQueue] = useState(queue)

    useEffect(() => {
        location.state === 'queue' ? setCurrentQueue(queue) : setCurrentQueue(selectedQueue)
    }, [location.state, queue, selectedQueue])

	return queue.tracks.length !== 0 ? (
		<>
			{location.state === 'queue' ? <NowPlaying /> : <QueueHeader selectedQueue={currentQueue}/>}
			<QueueList selectedQueue={currentQueue} type={location.state} />
		</>
	) : (
		<h2>loading...</h2>
	)
}

export default QueueView
