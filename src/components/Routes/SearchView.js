import Results from '../Results/Results'
import { useDataLayerValue } from '../../store/DataLayer'

import './SearchView.scss'

const SearchView = () => {
	const [{ searchResults }] = useDataLayerValue()

	return (
		<div className='search-results-con'>
			<h2>Search Results:</h2>
			<Results data={{ type: 'Tracks', items: searchResults.tracks }} />
			<Results data={{ type: 'Artists', items: searchResults.artists }} />
			<Results data={{ type: 'Albums', items: searchResults.albums }} />
		</div>
	)
}

export default SearchView
