import { useDataLayerValue } from '../../store/DataLayer'
import { Link } from "react-router-dom";

import './MainUser.scss'

const MainUser = () => {
    const [{ user }] = useDataLayerValue()
	return (
		<Link to={'/'} className='main-user'>
			<h4>{ user.name.split(' ')[0]}</h4>
			<div className='user-img'>
				<img src={ user.image } alt='' />
			</div>
		</Link>
	)
}

export default MainUser
