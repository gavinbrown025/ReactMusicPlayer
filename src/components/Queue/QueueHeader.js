import { useDataLayerValue } from '../../store/DataLayer'

const QueueHeader = () => {
	const [{ queue }] = useDataLayerValue()
	return (
		<div className='playlist-header'>
			<img src={queue.image} alt='' className='playlist-img' />
			<div className='playlist-meta'>
				<h2>{queue.name}</h2>
				<span>by: {queue.author}</span>
				<p>{queue.description}</p>
			</div>
		</div>
	)
}

export default QueueHeader
