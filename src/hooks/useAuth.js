//*imrs
import { useEffect } from 'react'
import axios from 'axios'
import { useDataLayerValue } from '../store/DataLayer'

const useAuth = (code) => {
    const [{ token }, dispatch] = useDataLayerValue()

	useEffect(() => {
		axios
			.post('http://localhost:5000/login', {
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
	}, [code])

    //return token.accessToken

	useEffect(() => {
		if (!token.refreshToken || !token.expiresIn) return //* only run if they have value
        const interval = setInterval(() => {
			axios
				.post('http://localhost:5000/refresh', {
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
		}, (token.expiresIn - 60) * 1)  //* refresh 1 minute before expiry(converted to ms)

    return () => clearInterval(interval)

	}, [token.refreshToken, token.expiresIn]) //* restart timer when these change

}

export default useAuth
