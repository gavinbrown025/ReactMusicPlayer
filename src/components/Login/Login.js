import './Login.scss'
import AccessForm from './AccessForm'
import LoginInfo from './LoginInfo'

const login = () => {
	return (
		<div className='login-con'>
      <LoginInfo />
			<AccessForm />
		</div>
	)
}

export default login
