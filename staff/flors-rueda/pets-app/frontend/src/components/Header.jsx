import { useState, useEffect } from "react"
import Btn from "./lib/Btn"
import Logo from "./lib/Logo"
import logics from "../logic"
import './Header.css'
import getLoggedUserId from "../logic/helpers/getLoggedUserId"
import UserAvatar from "./UserAvatar"
import { useNavigate } from "react-router"

const Header = ({ currentView, refreshHeader }) => {
    /*TODO:FIX HEADER */
    const [username, setUsername] = useState('')
    const [isUserMenuOpen, setUserMenuOpen] = useState(false)
    const [isUserLogged, setIsUserLogged] = useState(logics.users.isUserLoggedIn())
    const [avatar, setAvatar] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setIsUserLogged(logics.users.isUserLoggedIn())
        if (isUserLogged) {
            const retrivedUsername = logics.users.getUserUsernameById(getLoggedUserId())
            setUsername(retrivedUsername)
            const retrivedAvatar = logics.users.getUserAvatarById(getLoggedUserId())
            setAvatar(retrivedAvatar)
        }
    }, [refreshHeader, currentView])

    const onLogoutClick = () => {
        logics.users.logoutUser()
        setUserMenuOpen(false)
        navigate("/")
    }

    const handleLogoClick = () => {
        navigate("/")
    }

    const onMenuRouteClick = (path) => {
        if (path) navigate(path)
        setUserMenuOpen(false)
    }

    return <header className="header">
        {
            currentView === 'landing' && <Btn btnClassnames={"header__join-button"} btnContent={"Join in!"} btnCallback={() => navigate('/register')} />
        }
        {
            ((currentView === 'register' || currentView === 'login') || isUserLogged) && <Logo onClick={handleLogoClick} size="sm" />
        }
        {
            (isUserLogged && username.length > 0) && <p>{`Welcome, ${username}`}</p>
        }
        {
            (((username || avatar) && isUserLogged) &&
                <UserAvatar
                    size={'sm'}
                    avatar={avatar}
                    letter={username[0]}
                    buttonCallback={() => setUserMenuOpen(!isUserMenuOpen)}
                />)
        }
        {
            isUserMenuOpen && <aside className="header__user-menu">
                <Btn btnContent={'Account'} btnClassnames={'header__user-menu--button'} btnCallback={() => onMenuRouteClick('/my-profile')} />
                <Btn btnContent={'Meh'} btnClassnames={'header__user-menu--button'} btnCallback={() => onMenuRouteClick()} />
                <Btn btnContent={'Meh'} btnClassnames={'header__user-menu--button'} btnCallback={() => onMenuRouteClick()} />
                <Btn btnContent={'Logout'} btnClassnames={'header__user-menu--button'} btnCallback={onLogoutClick} />
            </aside>
        }

    </header>

}

export default Header
