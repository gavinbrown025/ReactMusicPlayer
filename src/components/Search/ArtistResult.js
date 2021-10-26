const ArtistResult = ({artist}) => {
    const handleSelection = (e) => {
		console.log(e.target)
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
