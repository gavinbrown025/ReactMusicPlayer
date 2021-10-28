import './Header.scss'
import SearchForm from '../Search/SearchForm'
import MainUser from './MainUser'

const Header = () => {
    return (
        <header>
            <SearchForm />
            <MainUser />
        </header>
    )
}

export default Header
