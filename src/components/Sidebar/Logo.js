import './Logo.scss';
import logo from '../../assets/images/altologo.png'

const Logo = ({style}) => {
    return (
        <div className={`logo ${style}`}>
            <img src={logo} alt="logo" />
        </div>
    )
}

export default Logo
