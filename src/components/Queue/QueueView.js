import { useDataLayerValue } from '../../store/DataLayer'

import './Queue.scss'

import QueueList from './QueueList'
import QueueHeader from './QueueHeader'
import NowPlaying from './NowPlaying'

const QueueView = () => {
	const [{ queue }] = useDataLayerValue()
	console.log(queue.tracks.length)

	return queue.tracks.length !== 0 ? (
		<>
			{queue.type === 'playlist' && <QueueHeader />}
			{queue.type === 'album' && <QueueHeader />}
			{queue.type === 'relative' && <NowPlaying />}
			<QueueList />
		</>
	) : (
		<h2>No Queue</h2>
	)
}

export default QueueView
