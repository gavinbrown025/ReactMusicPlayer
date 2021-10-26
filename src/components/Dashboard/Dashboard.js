import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import axios from 'axios'

import './Dashboard.scss'

import useAuth from '../../hooks/useAuth'

import Header from '../Header/Header'
import SearchResults from '../Search/SearchResults'
import Player from '../Player/Player'

const spotifyApi = new SpotifyWebApi({
	clientId: '8a7929a12fed4285ab9840e36fb2395c',
})

const Dashboard = ({ code }) => {
	const accessToken = useAuth(code)
  const [search, setSearch] = useState('')
	const [mainUser, setMainUser] = useState()
	const [myPlaylists, setMyPlaylists] = useState([])
	const [playingTrack, setPlayingTrack] = useState()
	const [showSearch, setShowSearch] = useState(true)
	const [lyrics, setLyrics] = useState('')

  const [searchResults, setSearchResults] = useState({
    tracks: 'No Tracks Found',
    artists: 'No Artists Found',
    albums: 'No Albums Found',
  })

  console.log(mainUser)

	useEffect(() => {
		if (!accessToken) return
		spotifyApi.setAccessToken(accessToken)
		spotifyApi
			.getMe()
			.then((data) => {
				setMainUser({
					id: data.body.id,
					name: data.body.display_name,
					image: data.body.images[0].url,
				})
				return data.body.id
			})
			.then((id) => {
				return spotifyApi.getUserPlaylists(id)
			})
			.then((playlists) => setMyPlaylists(playlists.body.items))
	}, [accessToken])


	useEffect(() => {
		if (!playingTrack) return
		axios
			.get('http://localhost:5000/lyrics', {
				params: {
					track: playingTrack.title,
					artist: playingTrack.artist,
				},
			})
			.then((res) => {
				setLyrics(res.data.lyrics)
			})
	}, [playingTrack])

	const chooseTrack = (track) => {
		setPlayingTrack(track)
		setShowSearch(false)
		setLyrics()
	}

	return (
        <>
        <Header
            mainUser={mainUser}
            setShowSearch={setShowSearch}
            setSearchResults={setSearchResults}
            spotifyApi={spotifyApi}
        />
		<main className='dashboard'>
			{/* <PlayLists /> */}
			{/* <Home /> */}
			{/* <NowPlaying /> */}
			<section className='container main-content-con'>
				{showSearch && <SearchResults
                searchResults={searchResults}
                search={search}
                setSearch={setSearch}
                chooseTrack={chooseTrack}
                />}
				{(!showSearch || playingTrack) && <div className='lyrics'>{lyrics}</div>}
			</section>
			<Player accessToken={accessToken} trackUri={playingTrack?.uri} />
		</main>
        </>
	)
}

export default Dashboard
