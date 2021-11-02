import icon from '../assets/images/no_user_icon.jpg'
import SpotifyWebApi from 'spotify-web-api-node'

export const initialState = {
	spotify: new SpotifyWebApi({ clientId: '8a7929a12fed4285ab9840e36fb2395c' }),
	token: {
		code: null,
		accessToken: null,
		refreshToken: null,
		expiresIn: null,
	},
	user: {
		id: '',
		name: '',
		image: icon,
	},
	myPlaylists: [],
	recommended: {
        tracks: [],
        artists: [],
        recommended: [],
    },
	searchResults: {
		tracks: [],
		artists: [],
		albums: [],
	},
    selectedArtist: {},
    selectedAlbum: {},
	isPlaying: false,
    currentlyPlaying: {
        track: {},
        artist: {},
        album: {},
    },
	queue: {
        type: 'Related',
        tracks: []
    },
    playerOffset: 0
}

const reducer = (state, action) => {
	console.log(action)
	if (action.type === 'SET_USER') {
		return {
			...state,
			user: action.user,
		}
	}
	if (action.type === 'SET_TOKEN') {
		return {
			...state,
			token: {
				accessToken: action.token.accessToken,
				refreshToken: action.token.refreshToken,
				expiresIn: action.token.expiresIn,
			},
		}
	}
	if (action.type === 'SET_SEARCH_RESULTS') {
		return {
			...state,
			searchResults: action.searchResults,
		}
	}
	if (action.type === 'SET_PLAYLISTS') {
		return {
			...state,
			myPlaylists: action.myPlaylists,
		}
	}
	if (action.type === 'SET_RECOMMENDED') {
		return {
			...state,
			recommended: action.recommended,
		}
	}
	if (action.type === 'SET_QUEUE') {
		return {
			...state,
			queue: action.queue,
            playerOffset: 0 || action.offset,
            isPlaying: action.play,
		}
	}
	if (action.type === 'SET_PLAY') {
		return {
			...state,
            isPlaying: action.isPlaying
		}
	}
	if (action.type === 'SET_CURRENT_TRACK') {
		return {
			...state,
            currentlyPlaying: action.currentlyPlaying
		}
	}
	if (action.type === 'SET_PLAYER_OFFSET') {
		return {
			...state,
            playerOffset: action.playerOffset
		}
	}
	return state
}

export default reducer
