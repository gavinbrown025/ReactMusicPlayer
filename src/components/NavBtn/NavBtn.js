import { useDataLayerValue } from '../../store/DataLayer'

import { QueueSvg } from '../Icons/Icons'
import './NavBtn.scss'

const NavBtn = () => {
	const [{}, dispatch] = useDataLayerValue()

	return (
		<div onClick={()=> dispatch({ type: 'SET_SHOW_MENU' })} className='nav-btn'>
			<QueueSvg />
		</div>
	)
}

export default NavBtn
