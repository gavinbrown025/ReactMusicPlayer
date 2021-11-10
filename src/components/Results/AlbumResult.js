import useGoToSelection from '../../hooks/useGoToSelection'

const AlbumResult = ({ album }) => {
	const { goToArtist, goToAlbum } = useGoToSelection()

	const handleSelection = async (e) => {
		e.target.className !== 'artist-link' ? goToAlbum(album) : goToArtist(album.artist.id)
	}

	return (
		<div className='card' onClick={handleSelection} key={album.id}>
			<img src={album.cover.small} alt='' />
			<div className='track-meta'>
				<h4>{album.name}</h4>
				<p className='artist-link'>{album.artist.name}</p>
			</div>
		</div>
	)
}
export default AlbumResult
