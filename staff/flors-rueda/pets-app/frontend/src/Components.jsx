const useState = React.useState
const useEffect = React.useEffect

const Header = ({ currentView, handleRegisterClick, handleLandingClick }) => {
    const [username, setUsername] = useState('')
    const [isUserMenuOpen, setUserMenuOpen] = useState(false)

    useEffect(() => {
        if (currentView === 'home') {
            const retrivedUsername = getLoggedUserUsername()
            setUsername(retrivedUsername)
        }
    }, [currentView])

    const onLogoutClick = () => {
        logoutUser()
        setUserMenuOpen(false)
        handleLandingClick()
    }

    return <header className="header">
        {
            currentView === 'landing' && <Btn btnContent={'Join in!'} btnClassnames={'header__join-button'} btnCallback={handleRegisterClick} />
        }
        {
            (currentView === 'register' || currentView === 'login') && <Logo onClick={handleLandingClick} size="sm" />
        }
        {
            (currentView === 'home') && <Logo size="sm" />
        }

        {
            (currentView === 'home' && username) && <p>{`Welcome, ${username}`}</p>
        }
        {
            (currentView === 'home' && username) && <Btn btnContent={username[0].toUpperCase()} btnClassnames={'header__user-button'} btnCallback={() => setUserMenuOpen(!isUserMenuOpen)} />
        }
        {
            isUserMenuOpen && <aside className="header__user-menu">
                <Btn btnContent={'Meh'} btnClassnames={'header__user-menu--button'} btnCallback={() => setUserMenuOpen(false)} />
                <Btn btnContent={'Meh'} btnClassnames={'header__user-menu--button'} btnCallback={() => setUserMenuOpen(false)} />
                <Btn btnContent={'Meh'} btnClassnames={'header__user-menu--button'} btnCallback={() => setUserMenuOpen(false)} />
                <Btn btnContent={'Logout'} btnClassnames={'header__user-menu--button'} btnCallback={onLogoutClick} />
            </aside>
        }

    </header>

}
