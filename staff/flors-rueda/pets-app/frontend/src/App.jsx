const useState = React.useState
const useEffect = React.useEffect


const App = () => {
    const [view, setView] = useState(isUserLoggedIn() ? 'home' : 'landing') //register, login, home

    const navigateToLogin = () => setView('login')

    const navigateToRegister = () => {
        setView('register')
    }
    const navigateToHome = () => setView('home')

    const navigateToLanding = () => {
        setView('landing')
    }


    useEffect(() => {
    }, [view])


    return <div className={view}>
        <Header
            currentView={view}
            handleRegisterClick={navigateToRegister}
            handleLandingClick={navigateToLanding}
        />
        {view === 'landing' && <Landing />}
        {view === 'register' && <Register handleNavigateToHome={navigateToHome} handleLoginClick={navigateToLogin} />}
        {view === 'login' && <Login />}
        {view === 'home' && <Home />}
    </div>
}