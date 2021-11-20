export let SERVER_URL= 'https://music-server-gb.herokuapp.com'
let REDIRECT_URI= 'https://react-player-gb.herokuapp.com/'

const DEV_ENV = true
if(DEV_ENV){
    SERVER_URL = 'http://localhost:5000'
    REDIRECT_URI = 'http://localhost:3000/'
}

const authEndpoint = 'https://accounts.spotify.com/authorize'
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

export const AUTH_URL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join('%20')}&response_type=code&dialog=true`
