import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDataLayerValue } from '../../store/DataLayer'
import useGoToSelection from '../../hooks/useGoToSelection'

import './LargePlayer.scss'

const LargePlayer = () => {
    const { goToArtist, goToAlbum } = useGoToSelection()
	const [{ currentlyPlaying }] = useDataLayerValue()
	const [lyrics, setLyrics] = useState(null)
	const [showLyrics, setShowLyrics] = useState(false)

	useEffect(() => {
		if (!currentlyPlaying) return
		const getLyrics = async () => {
			const res = await axios.get('https://music-server-gb.herokuapp.com/lyrics', {
				params: {
					track: currentlyPlaying.track.name,
					artist: currentlyPlaying.artist.name,
				},
			})
			setLyrics(await res.data.lyrics)
			;(await res.data.lyrics) === '' && setShowLyrics(false)
		}
		getLyrics()
		return () => setLyrics(null)
	}, [currentlyPlaying])

	return (
		<div className='large-player'>
			<div className={`track-con ${showLyrics && 'hasLyrics'}`}>
				<div className='img-con'>
					<img src={currentlyPlaying.album.cover.large} alt='' />
				</div>
				<div className='track-meta'>
					<h3>{currentlyPlaying.track.name}</h3>
					<p className='artist-link' onClick={()=> goToArtist(currentlyPlaying.artist.id)}>{currentlyPlaying.artist.name}</p>
					<p className='album-link' onClick={()=> goToAlbum(currentlyPlaying.album)}>{currentlyPlaying.album.name}</p>
					{!showLyrics && (
						<a className={!lyrics && 'none'} onClick={() => lyrics !== '' && setShowLyrics(true)}>
							{lyrics === null && 'Loading Lyrics'}
							{lyrics === '' && 'No Lyrics Available'}
							{lyrics && 'Show Lyrics'}
						</a>
					)}
				</div>
			</div>
			{showLyrics && (
				<div className='lyrics-con'>
					<h3>
						Lyrics:
						{lyrics !== '' && showLyrics && <a onClick={() => setShowLyrics(false)}>{lyrics === null ? 'Loading Lyrics' : 'Hide Lyrics'}</a>}
					</h3>
					<p className='lyrics'>{lyrics}</p>
				</div>
			)}
		</div>
	)
}

export default LargePlayer
