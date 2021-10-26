import './Header.scss'
import SearchForm from '../Search/SearchForm'
import MainUser from './MainUser'

const Header = ({ spotifyApi, setSearchResults, setShowSearch, mainUser }) => {
    return (
        <header>
            <MainUser mainUser={mainUser} />
            <SearchForm setShowSearch={setShowSearch} setSearchResults={setSearchResults} spotifyApi={spotifyApi} />
        </header>
    )
}

export default Header
