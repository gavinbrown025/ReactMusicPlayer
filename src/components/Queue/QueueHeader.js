const QueueHeader = ({ selectedQueue }) => {
	return (
		selectedQueue.data ? (
			<div className='playlist-header'>
				<img src={selectedQueue.data.image} alt='' className='playlist-img' />
				<div className='playlist-meta'>
					<h2>{selectedQueue.data.name}</h2>
					<span>by: {selectedQueue.data.author}</span>
					<p>{selectedQueue.data.description}</p>
				</div>
			</div>
		) : (
            <h2>loading</h2>
        )
	)
}

export default QueueHeader
