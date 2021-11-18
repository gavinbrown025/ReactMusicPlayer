const sortImageSize = (images) => {
	if (images.length === 0) {
		const blank = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1024px-Spotify_logo_without_text.svg.png'
		return [{ url: blank }, { url: blank }, { url: blank }]
	}
	if (images.length < 3 && images.length > 0) {
		let url = images[images.length - 1].url
		return [{ url }, { url }, { url }]
	}
	return images.sort((a, b) => a.height - b.height)
}

const formatTime = (time) => {
	time = Math.floor(time / 1000)
	let minute = Math.floor(time / 60)
	let second = Math.floor(time - minute * 60)
	second = second > 9 ? second : `0${second}`
	return `${minute}:${second}`
}

export const FormatTracks = (data) => {
    console.log(data)
	return data.map((track) => {
		const albumCovers = sortImageSize(track.album.images)
		return {
			track: {
				id: track.id,
				name: track.name,
				uri: track.uri,
				duration: formatTime(track.duration_ms),
			},
			artist: {
				id: track.artists[0].id,
				name: track.artists[0].name,
				uri: track.artists[0].uri,
			},
			album: {
				id: track.album.id,
				name: track.album.name,
				uri: track.album.uri,
				artist: {
                    id: track.artists[0].id,
                    name: track.artists[0].name,
                },
                releaseDate: track.album.releaseDate,
                totalTracks: track.album.totalTracks,
				cover: {
					thumb: albumCovers[0].url,
					small: albumCovers[1].url,
					large: albumCovers[2].url,
				},
			},
		}
	})
}
export const FormatArtists = (data) => {
	return data.map((artist) => {
		const artistImages = sortImageSize(artist.images)
		return {
			id: artist.id,
			name: artist.name,
			uri: artist.uri,
			cover: {
				thumb: artistImages[0].url,
				small: artistImages[1].url,
				large: artistImages[2].url,
			},
		}
	})
}

export const FormatAlbums = (data) => {
	return data.map((album) => {
		const albumCovers = sortImageSize(album.images)
		return {
			id: album.id,
			name: album.name,
			uri: album.uri,
			totalTracks: album.total_tracks,
			releaseDate: new Date(album.release_date).toDateString(),
			cover: {
				thumb: albumCovers[0].url,
				small: albumCovers[1].url,
				large: albumCovers[2].url,
			},
			artist: {
				id: album.artists[0].id,
				name: album.artists[0].name,
			},
		}
	})
}
