import QueueItem from "./QueueItem";
import { useDataLayerValue } from '../../store/DataLayer'
const QueueList = () => {
  const [{ queue }] = useDataLayerValue()

    return (
      <div className="queue-list-con">
          <div className="queue-list-header">
            <h3>Track Name</h3>
            <h3>Album</h3>
            <h3>Length</h3>
          </div>
        <ul>
          {queue.tracks.map((track, index) =>
            <QueueItem key={track.track.uri} index={index} track={track}/>
            )}
        </ul>
      </div>
    )
}

export default QueueList
