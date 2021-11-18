import axios from 'axios'
import { useEffect } from 'react'
import { useDataLayerValue } from '../store/DataLayer'

const production = true
let url = 'http://localhost:5000'
let redirectUri = 'http://localhost:3000/'

if(production){
    url = 'https://music-server-gb.herokuapp.com'
    redirectUri = 'https://react-player-gb.herokuapp.com/'
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

export const AUTH_URL = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=code&dialog=true`


const useAuth = (code) => {
	const [{ token }, dispatch] = useDataLayerValue()

	useEffect(() => {
		axios
			.post(`${url}/login`, {
				code,
			})
			.then((res) => {
				dispatch({
					type: 'SET_TOKEN',
					token: {
						accessToken: res.data.accessToken,
						refreshToken: res.data.refreshToken,
						expiresIn: res.data.expiresIn,
					},
				})
				window.history.pushState({}, null, '/') //* clears browser url
			})
			.catch((err) => {
				console.log(err)
				window.location = '/' //* sends back to root
			})
	}, [code, dispatch])

	useEffect(() => {
		if (!token.refreshToken || !token.expiresIn) return //* only run if they have value
		const interval = setInterval(() => {
			axios
				.post(`${url}/refresh`, {
					refreshToken: token.refreshToken,
				})
				.then((res) => {
					console.log(res)
					dispatch({
						type: 'SET_TOKEN',
						token: {
							accessToken: res.data.accessToken,
							refreshToken: res.data.refreshToken,
							expiresIn: res.data.expiresIn,
						},
					})
				})
				.catch((err) => {
					window.location = '/' //* sends back to root
				})
		}, (token.expiresIn - 60) * 1000) //* refresh 1 minute before expiry(converted to ms)

		return () => clearInterval(interval)
	}, [token.refreshToken, token.expiresIn, dispatch]) //* restart timer when these change

}

export default useAuth
