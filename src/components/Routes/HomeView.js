import { useDataLayerValue } from '../../store/DataLayer'

import './HomeView.scss'

import TrackResult from '../Search/TrackResult'
import ArtistResult from '../Search/ArtistResult'

const HomeView = () => {
	const [{ recommended, user }] = useDataLayerValue()
	return (
		<section className='home-view'>
			<h2>Welcome to Alto</h2>
			<div className='recommended'>
				<h3>Top Tracks For {user.name}</h3>
				<div className='sub-results-con'>
					{recommended.recommended.length === 0 ? <h4>No Tracks Found</h4> : recommended.recommended.map((track) => <TrackResult key={track.track.uri} track={track} />)}
				</div>
			</div>
			<div className='recommended'>
				<h3>Recently Played by {user.name}</h3>
				<div className='sub-results-con'>{recommended.tracks.length === 0 ? <h4>No Tracks Found</h4> : recommended.tracks.map((track) => <TrackResult key={track.track.uri} track={track} />)}</div>
			</div>
			<div className='recommended'>
				<h3>Top Artists for {user.name}</h3>
				<div className='sub-results-con'>{recommended.artists.length === 0 ? <h4>No Tracks Found</h4> : recommended.artists.map((artist) => <ArtistResult key={artist.uri} artist={artist} />)}</div>
			</div>
		</section>
	)
}

export default HomeView
