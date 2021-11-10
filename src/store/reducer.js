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
    focusSearch: false,
	searchResults: {
		tracks: [],
		artists: [],
		albums: [],
	},
    selectedQueue: {
        data:{},
        tracks: [],
    },
	selectedArtist: {
        data: {},
		tracks: [],
		albums: [],
	},
	isPlaying: false,
	currentlyPlaying: {
		track: {},
		artist: {},
		album: {},
	},
	queue: {
		name: 'Queue',
		tracks: [],
	},
	playerOffset: 0,
}

const reducer = (state, action) => {
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
		let currentlyPlaying = action.offset ? action.queue.tracks[action.offset] : action.queue.tracks[0]
        let playerOffset = action.offset ? action.offset : 0
        return {
			...state,
			queue: action.queue,
			currentlyPlaying,
			playerOffset,
		}
	}
	if (action.type === 'SET_PLAY') {
		return {
			...state,
			isPlaying: action.isPlaying,
		}
	}
	if (action.type === 'SET_CURRENT_TRACK') {
		return {
			...state,
			currentlyPlaying: action.currentlyPlaying,
		}
	}
	if (action.type === 'SET_PLAYER_OFFSET') {
		return {
			...state,
			playerOffset: action.playerOffset,
		}
	}
	if (action.type === 'SET_ARTIST') {
		return {
			...state,
			selectedArtist: action.selectedArtist,
		}
	}
	if (action.type === 'SET_SELECTED_QUEUE') {
		return {
			...state,
			selectedQueue: action.selectedQueue,
		}
	}
	if (action.type === 'SET_FOCUS_SEARCH') {
		return {
			...state,
			focusSearch: action.focusSearch,
		}
	}
	return state
}

export default reducer
