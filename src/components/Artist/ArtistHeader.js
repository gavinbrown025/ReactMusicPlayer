import { useDataLayerValue } from '../../store/DataLayer'

const ArtistHeader = () => {
	const [{ selectedArtist }] = useDataLayerValue()
	return (
		<section className='artist-header'>
			<div className='a-header-img'>
				<img src={selectedArtist.data.cover.large} alt='' />
        <div className="img-overlay"></div>
			</div>
			<h2>{selectedArtist.data.name}</h2>
		</section>
	)
}

export default ArtistHeader
