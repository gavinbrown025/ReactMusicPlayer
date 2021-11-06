import { useDataLayerValue } from '../../store/DataLayer'
import { useEffect, useState } from 'react'

import './Queue.scss'

import QueueList from './QueueList'
import QueueHeader from './QueueHeader'
import NowPlaying from './NowPlaying'

const QueueView = ({ location }) => {
	const [{ queue, selectedAlbum, selectedPlaylist }] = useDataLayerValue()
	const [selectedQueue, setSelectedQueue] = useState(queue)

    useEffect(() => {
        location.state === 'queue' && setSelectedQueue(queue)
        location.state === 'album' && setSelectedQueue(selectedAlbum)
        location.state === 'playlist' && setSelectedQueue(selectedPlaylist)
    }, [location.state, queue, selectedAlbum, selectedPlaylist])

	return queue.tracks.length !== 0 ? (
		<>
			{location.state === 'queue' ? <NowPlaying /> : <QueueHeader selectedQueue={selectedQueue}/>}
			<QueueList selectedQueue={selectedQueue} type={location.state} />
		</>
	) : (
		<h2>loading...</h2>
	)
}

export default QueueView
