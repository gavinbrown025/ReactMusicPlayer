import { useDataLayerValue } from '../../store/DataLayer'

const PlayerPreview = () => {
    const [{ currentlyPlaying }] = useDataLayerValue()
    return (
        <div className="player-preview">
            {currentlyPlaying.album.cover && <img src={currentlyPlaying.album.cover.small} alt="" />}
        </div>
    )
}

export default PlayerPreview
