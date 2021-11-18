import './Logo.scss';
import logo from '../../assets/images/altologo.png'

const Logo = () => {
    return (
        <div className="logo">
            <img src={logo} alt="" />
        </div>
    )
}

export default Logo
