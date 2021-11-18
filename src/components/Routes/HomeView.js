import { useDataLayerValue } from '../../store/DataLayer'
import Results from '../Results/Results'

import './HomeView.scss'

const HomeView = () => {
	const [{ recommended, user }] = useDataLayerValue()
	return (
		<section className='home-view'>
			<h2>Welcome to Alto</h2>
			<Results data={{ title: `Top Tracks For ${user.name}`, type: 'Tracks', items: recommended.recommended }} />
			<Results data={{ title: `Top Artists For ${user.name}`, type: 'Artists', items: recommended.artists }} />
			<Results data={{ title: `${user.name}'s Favourite Tracks`, type: 'Tracks', items: recommended.tracks }} />
		</section>
	)
}

export default HomeView
