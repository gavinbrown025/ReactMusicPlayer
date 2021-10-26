import './Login.scss'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=8a7929a12fed4285ab9840e36fb2395c&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

const login = () => {
    return (
        <div className="container login-con">
            <a href={AUTH_URL}>Login With Spotify</a>
        </div>
    )
}

export default login
