import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDataLayerValue } from '../../store/DataLayer'

const LargePlayer = () => {
	const [{ currentlyPlaying }] = useDataLayerValue()
	const [lyrics, setLyrics] = useState('')
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
		}
		getLyrics()
		return () => setLyrics('')
	}, [currentlyPlaying])

	return (
		<div className='large-player'>
			<div className={`track-con ${showLyrics && 'hasLyrics'}`}>
				<div className='img-con'>
					<img src={currentlyPlaying.album.cover.large} alt='' />
				</div>
				<div className='track-meta'>
					<h3>{currentlyPlaying.track.name}</h3>
					<p className='artist-link'>{currentlyPlaying.artist.name}</p>
					<p className='album-link'>{currentlyPlaying.album.name}</p>
				</div>
			</div>
			{showLyrics && (
				<div className='lyrics-con'>
          <h3>Lyrics:</h3>
					<p className='lyrics'>{lyrics}</p>
				</div>
			)}
		</div>
	)
}

export default LargePlayer
//
