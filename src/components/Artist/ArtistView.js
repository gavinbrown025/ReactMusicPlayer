import { useDataLayerValue } from '../../store/DataLayer'

import ArtistHeader from './ArtistHeader'
import QueueList from '../Queue/QueueList'
import AlbumResult from '../Search/AlbumResult'

import './Artist.scss'

const ArtistView = () => {
	const [{ selectedArtist }] = useDataLayerValue()

	return (
		<>
			<ArtistHeader />
			<section className='artist-content'>
				<QueueList selectedQueue={selectedArtist} type={'artist'} />
				<div className='sub-results-con artist'>
					<h3 className='search-results-title'>Albums</h3>
					{selectedArtist.albums.map((album) => (
						<AlbumResult key={album.uri} album={album} />
					))}
				</div>
			</section>
		</>
	)
}

export default ArtistView
