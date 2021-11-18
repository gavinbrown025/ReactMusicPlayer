import './Login.scss'

import { AUTH_URL } from '../../hooks/useAuth'

const login = () => {
    return (
        <div className="container login-con">
            <a href={AUTH_URL}>Login With Spotify</a>
        </div>
    )
}

export default login
