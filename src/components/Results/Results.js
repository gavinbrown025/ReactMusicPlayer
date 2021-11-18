import TrackResult from '../Results/TrackResult'
import ArtistResult from '../Results/ArtistResult'
import AlbumResult from '../Results/AlbumResult'

const Results = ({ data }) => {
	const ResultList = () => {
		if (data.items.length !== 0) {
			if (data.type === 'Tracks') return data.items.map((item) => <TrackResult key={item.track.uri} track={item} />)
			if (data.type === 'Artists') return data.items.map((item) => <ArtistResult key={item.uri} artist={item} />)
			if (data.type === 'Albums') return data.items.map((item) => <AlbumResult key={item.uri} album={item} />)
		} else {
			return <h3>No {data.type} found</h3>
		}
	}

	return (
		<div className='sub-results-con'>
			<h3 className='search-results-title'>{data.title ? data.title : data.type}</h3>
			<ResultList />
		</div>
	)
}

export default Results
