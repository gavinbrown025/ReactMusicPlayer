import './Login.scss'

const authEndpoint = 'https://accounts.spotify.com/authorize'
const redirectUri = 'http://localhost:3000/'
const clientId = '8a7929a12fed4285ab9840e36fb2395c'
const scopes = [
    'streaming',
    'user-top-read',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-library-modify',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-modify-playback-state',
]

const AUTH_URL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=code`

const login = () => {
    return (
        <div className="container login-con">
            <a href={AUTH_URL}>Login With Spotify</a>
        </div>
    )
}

export default login
