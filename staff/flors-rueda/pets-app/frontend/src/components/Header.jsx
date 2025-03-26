import { useState, useEffect } from "react"
import Btn from "./lib/Btn"
import Logo from "./lib/Logo"
import logics from "../logic"

const Header = ({ currentView, handleRegisterClick, handleLandingClick, handleAccountClick, handleHomeClick }) => {
    const [username, setUsername] = useState('')
    const [isUserMenuOpen, setUserMenuOpen] = useState(false)
    const [isUserLogged, setIsUserLogged] = useState(logics.users.isUserLoggedIn())

    useEffect(() => {
        setIsUserLogged(logics.users.isUserLoggedIn())
        if (currentView === 'home') {
            const retrivedUsername = logics.users.getLoggedUserUsername()
            setUsername(retrivedUsername)
        }
    }, [currentView])

    const onLogoutClick = () => {
        logics.users.logoutUser()
        setUserMenuOpen(false)
        handleLandingClick()
    }

    const onAccountClick = () => {
        handleAccountClick()
        setUserMenuOpen(false)
    }

    return <header className="header">
        {
            currentView === 'landing' && <Btn btnContent={'Join in!'} btnClassnames={'header__join-button'} btnCallback={handleRegisterClick} />
        }
        {
            (currentView === 'register' || currentView === 'login') && <Logo onClick={handleLandingClick} size="sm" />
        }
        {
            isUserLogged && <Logo size="sm" onClick={handleHomeClick} />
        }

        {
            (isUserLogged && username.length > 0) && <p>{`Welcome, ${username}`}</p>
        }
        {
            (isUserLogged && username.length > 0) && <Btn btnContent={username[0].toUpperCase()} btnClassnames={'header__user-button'} btnCallback={() => setUserMenuOpen(!isUserMenuOpen)} />
        }
        {
            isUserMenuOpen && <aside className="header__user-menu">
                <Btn btnContent={'Account'} btnClassnames={'header__user-menu--button'} btnCallback={onAccountClick} />
                <Btn btnContent={'Meh'} btnClassnames={'header__user-menu--button'} btnCallback={() => setUserMenuOpen(false)} />
                <Btn btnContent={'Meh'} btnClassnames={'header__user-menu--button'} btnCallback={() => setUserMenuOpen(false)} />
                <Btn btnContent={'Logout'} btnClassnames={'header__user-menu--button'} btnCallback={onLogoutClick} />
            </aside>
        }

    </header>

}

export default Header
