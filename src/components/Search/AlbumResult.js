const AlbumResult = ({album}) => {
    const handleSelection = (e) => {
		console.log(e.target)
	}

	return (
		<div className='card' onClick={handleSelection} key={album.id}>
			<img src={album.cover.small} alt='' />
			<div className='track-meta'>
				<h4>{album.name}</h4>
				<p>{album.artist.name}</p>
			</div>
		</div>
	)
}

export default AlbumResult

