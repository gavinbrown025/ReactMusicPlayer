import './Header.scss'

import NavBtn from '../NavBtn/NavBtn'
import SearchForm from './SearchForm'
import MainUser from './MainUser'

const Header = () => {
    return (
        <header>
            <NavBtn />
            <SearchForm />
            <MainUser />
        </header>
    )
}

export default Header
