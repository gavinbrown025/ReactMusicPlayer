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
	selectedQueue: {
        data: {},
		tracks: [],
	},
	selectedArtist: {
        data: {},
		tracks: [],
		albums: [],
	},
    queue: {
        tracks: [],
    },
	currentlyPlaying: {
        track: {},
		artist: {},
		album: {},
	},
	isPlaying: false,
	playerOffset: 0,
    focusSearch: null,
    isLargePlayer: false
}

const reducer = (state, action) => {
	console.log(action.type)
	if (action.type === 'SET_INITIAL') {
		return {
			...state,
			user: action.user,
			myPlaylists: action.myPlaylists,
			recommended: action.recommended,
			queue: { tracks: action.recents },
			currentlyPlaying: action.recents[0],
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
    if (action.type === 'SET_CURRENT_TRACK') {
        return {
            ...state,
            currentlyPlaying: action.currentlyPlaying,
        }
    }
	if (action.type === 'SET_PLAY') {
		return {
			...state,
			isPlaying: action.isPlaying,
		}
	}
    if (action.type === 'SET_PLAYER_OFFSET') {
        return {
            ...state,
            playerOffset: action.playerOffset,
        }
    }
	if (action.type === 'SET_FOCUS_SEARCH') {
		return {
			...state,
			focusSearch: action.focusSearch,
		}
	}
	if (action.type === 'SET_LARGE_PLAYER') {
		return {
			...state,
			isLargePlayer: action.isLargePlayer,
		}
	}
	return state
}

export default reducer
