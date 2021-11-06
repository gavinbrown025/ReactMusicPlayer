import { useDataLayerValue } from '../../store/DataLayer'
import FormatData from '../../store/FormatData'
import { useHistory } from "react-router-dom";

const ArtistResult = ({ artist }) => {
	const [{ spotify }, dispatch] = useDataLayerValue()
    const history = useHistory()

	const handleSelection = async () => {
		const artistAlbumsData = await spotify.getArtistAlbums(artist.id)
		const artistAlbums = await FormatData({
			type: 'FORMAT_ALBUMS',
			data: artistAlbumsData.body.items,
		})
		const artistTopTracksData = await spotify.getArtistTopTracks(artist.id, 'CA')
		const artistTopTracks = await FormatData({
			type: 'FORMAT_TRACKS',
			data: artistTopTracksData.body.tracks,
		})
		await dispatch({
			type: 'SET_ARTIST',
			selectedArtist: {
                data: artist,
				tracks: artistTopTracks,
				albums: artistAlbums,
			},
		})
        history.push({pathname:'artist', state: 'artist'})
	}

	return (
		<div className='card' onClick={handleSelection} key={artist.id}>
			<img src={artist.cover.small} alt='' />
			<div className='track-meta'>
				<h4>{artist.name}</h4>
			</div>
		</div>
	)
}

export default ArtistResult
