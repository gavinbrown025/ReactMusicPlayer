import QueueItem from "./QueueItem";
import { useDataLayerValue } from '../../store/DataLayer'
const QueueList = () => {
  const [{ queue }] = useDataLayerValue()

    return (
      <div className="queue-list-con">
        <ul>
          {queue.tracks.map((track, index) =>
            <QueueItem key={track.track.uri} index={index} track={track}/>
            )}
        </ul>
      </div>
    )
}

export default QueueList
