import { useDataLayerValue } from '../../store/DataLayer'

import QueueList from '../TrackList/QueueList'
import QueueHeader from '../TrackList/QueueHeader'
import CurrentTrack from '../TrackList/CurrentTrack'

const QueueView = () => {
    const [{ queue }] = useDataLayerValue()
    return (
        <>
            {queue.type === 'playList' && <QueueHeader />}
            {queue.type === 'album' && <QueueHeader />}
            {queue.type === 'relative' && <CurrentTrack />}
            <QueueList />
        </>
    )
}

export default QueueView
