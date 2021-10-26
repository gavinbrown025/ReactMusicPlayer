//*imrs
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useAuth = (code) => {
	const [accessToken, setAccessToken] = useState()
	const [refreshToken, setRefreshToken] = useState()
	const [expiresIn, setExpiresIn] = useState()

	useEffect(() => {
		axios
			.post('http://localhost:5000/login', {
				code,
			})
			.then((res) => {
				setAccessToken(res.data.accessToken)
				setRefreshToken(res.data.refreshToken)
				setExpiresIn(res.data.expiresIn)
				window.history.pushState({}, null, '/') //* clears browser url
			})
			.catch((err) => {
				console.log(err)
				window.location = '/' //* sends back to root
			})
	}, [code])

	useEffect(() => {
		if (!refreshToken || !expiresIn) return //* only run if they have value
		const interval = setInterval(() => {
			axios
				.post('http://localhost:5000/refresh', {
					refreshToken,
				})
				.then((res) => {
					setAccessToken(res.data.accessToken)
					setExpiresIn(res.data.expiresIn)
				})
				.catch((err) => {
					window.location = '/' //* sends back to root
				})
		}, (expiresIn - 60) * 1000)  //* refresh 1 minute before expiry(converted to ms)

    return () => clearInterval(interval)

	}, [refreshToken, expiresIn]) //* restart timer when these change

	return accessToken
}

export default useAuth
