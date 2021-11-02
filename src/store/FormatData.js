const sortImageSize = (images) => {
	if (images.length < 2) {
		let setImages = [{ url: null }, { url: null }, { url: null }]
		return setImages
	}
	return images.sort((a, b) => a.height - b.height)
}

const FormatData = ({ type, data }) => {
	if (type === 'FORMAT_TRACKS')
		return data.map((track) => {
			const albumCovers = sortImageSize(track.album.images)
			return {
				track: {
					id: track.id,
                    name: track.name,
					uri: track.uri,
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
					cover: {
						thumb: albumCovers[0].url,
						small: albumCovers[1].url,
						large: albumCovers[2].url,
					},
				},
			}
		})

	if (type === 'FORMAT_ARTISTS') {
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

	if (type === 'FORMAT_ALBUMS') {
		return data.map((album) => {
			const albumCovers = sortImageSize(album.images)
			return {
				id: album.id,
				name: album.name,
				uri: album.uri,
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
}
export default FormatData
