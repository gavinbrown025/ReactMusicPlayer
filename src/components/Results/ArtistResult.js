import useGoToSelection from '../../hooks/useGoToSelection'

const ArtistResult = ({ artist }) => {
	const { goToArtist } = useGoToSelection()

	return (
		<div className='card' onClick={() => goToArtist(artist.id)} key={artist.id}>
			<img src={artist.cover.small} alt='' />
			<div className='track-meta'>
				<h4>{artist.name}</h4>
			</div>
		</div>
	)
}

export default ArtistResult
