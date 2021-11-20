import useGoToSelection from '../../hooks/useGoToSelection'

const QueueHeader = ({ selectedQueue }) => {
	const { goToArtist } = useGoToSelection()

	return selectedQueue.data ? (
		<div className='playlist-header'>
			<img src={selectedQueue.data.image} alt='' className='playlist-img' />
			<div className='playlist-meta'>
				<h2>{selectedQueue.data.name}</h2>
				<span onClick={() => goToArtist(selectedQueue.data.artistId)} className={selectedQueue.data.artistId && 'artist-link'}>
					{selectedQueue.data.author}
				</span>
				<p>{selectedQueue.data.description}</p>
			</div>
		</div>
	) : (
		<h2>loading</h2>
	)
}

export default QueueHeader
