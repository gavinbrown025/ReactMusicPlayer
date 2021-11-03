import {useDataLayerValue} from '../../store/DataLayer'
import QueueItem from "./QueueItem";

const NowPlaying = () => {
    const [{ currentlyPlaying }] = useDataLayerValue()
    return (
        <div className="now-playing">
            <h2>Queue</h2>
            <h3>Now Playing</h3>
            {<QueueItem index={null} track={currentlyPlaying}/> }
        </div>
    )
}

export default NowPlaying
