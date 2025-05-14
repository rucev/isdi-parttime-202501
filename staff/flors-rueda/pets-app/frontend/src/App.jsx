import { useState, useEffect } from "react"
import logics from "./logic/index"
import Header from "./components/Header"
import { useLocation, useNavigate } from "react-router"
import isUserLoggedIn from "./logic/users/isUserLoggedIn"
import Private from "./pages/Private"
import Public from "./pages/Public"
import Btn from "./components/lib/Btn"
import Alert from "./components/lib/Alert"
import { customContext } from "./hooks/useCustomContext"


const App = () => {
    const [refreshHeader, setRefreshHeader] = useState(Date.now())
    const [isUserLogged, setIsUserLogged] = useState(logics.users.isUserLoggedIn())
    const [locale, setLocale] = useState('en')
    const [alertError, setAlertError] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    const onLogoutClick = () => {
        logics.users.logoutUser()
        setIsUserLogged(logics.users.isUserLoggedIn())
        setRefreshHeader(Date.now())
        navigate("/")
    }

    useEffect(() => {
        setIsUserLogged(logics.users.isUserLoggedIn())
    }, [location.pathname])

    const onSetLocale = () => {
        setLocale(locale === 'en' ? 'es' : 'en')
    }


    return <customContext.Provider value={{ alert: (error) => { setAlertError(error) } }} >
        <div className="flex flex-col gap-2 w-full">
            <Header
                isUserLogged={isUserLogged}
                refreshHeader={refreshHeader}
                logout={onLogoutClick}
                locale={locale}
            />
            {isUserLoggedIn() ? <Private setRefreshHeader={setRefreshHeader} locale={locale} /> : <Public setRefreshHeader={setRefreshHeader} locale={locale} />}
            <Btn btnCallback={onSetLocale} btnContent={locale === 'en' ? 'traducir' : 'translate'} btnClassnames={'translate-btn'} />
        </div>
        {alertError && <Alert error={alertError} onClose={() => setAlertError(null)} />}
    </customContext.Provider>
}

export default App