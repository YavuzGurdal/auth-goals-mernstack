import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux' // useSelector state'e ulasmami sagliyor. useDispatch veri gondermemi sagliyor
import { logout, reset } from '../features/auth/authSlice'


function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth) // merkezi state'den user'i aliyorum

    const onLogout = () => {
        dispatch(logout()) // authSlice.js'den gelen logout() fonksiyonunu calistiriyorum
        dispatch(reset()) // authSlice.js'den gelen reset() fonksiyonunu calistiriyorum
        navigate('/')
    }

    return (
        <header className="header">
            <div className="logo">
                <Link to='/'>GoalSetter</Link>
            </div>
            <ul>
                {
                    user ?
                        (
                            <li>
                                <button className="btn" onClick={onLogout}>
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                        )
                        :
                        (
                            <>
                                <li>
                                    <Link to='/login'>
                                        <FaSignInAlt /> Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/register'>
                                        <FaUser /> Register
                                    </Link>
                                </li>
                            </>
                        )
                }
            </ul>
        </header>
    )
}

export default Header