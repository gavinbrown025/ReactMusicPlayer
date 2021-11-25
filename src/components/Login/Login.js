import './Login.scss'
import Logo from '../Sidebar/Logo'
import AccessForm from './AccessForm'
import LoginInfo from './LoginInfo'

import { AUTH_URL } from '../../store/AUTH_URL'

const login = () => {
	return (
		<div className='login-con'>
  
			<div className='login-header'>
				<Logo style={'login'} />
				<a className='spotify-link' href={AUTH_URL}>
					Login With Spotify
				</a>
			</div>

			<AccessForm />
			<LoginInfo />
		</div>
	)
}

export default login
