import { useState, useEffect } from "react"
import pages from "./pages/index"
import logics from "./logic/index"
import Header from "./components/Header"
import { Routes, Route, useLocation } from "react-router"

const { Landing, Home, Login, Register, MyProfile, UserProfile, NotFound } = pages

const App = () => {
    const [refreshHeader, setRefreshHeader] = useState(Date.now())
    const [view, setView] = useState('')
    const location = useLocation()
    const views = ['landing', 'login', 'register', 'my-profile', 'user-profile', 'home'] //TODO: not use this

    useEffect(() => {
        const path = location.pathname

        const pathArray = path.split("")
        pathArray.shift()

        if (pathArray.length === 0) {
            setView(logics.users.isUserLoggedIn() ? 'home' : 'landing')
        } else {
            const cleanPath = pathArray.join("")
            if (cleanPath.includes("/")) setView("user-profile")
            else if ((cleanPath === "login" || cleanPath === "register") && logics.users.isUserLoggedIn()) setView('not-found')
            else if (views.includes(cleanPath)) setView(cleanPath)
            else setView('not-found')
        }

        console.log(view)
    }, [location.pathname])


    return <div className={view}>
        <Header
            currentView={view}
            refreshHeader={refreshHeader}
        />
        <Routes>
            <Route path="/" element={logics.users.isUserLoggedIn() ? <Home /> : <Landing />} />
            <Route path="/login" element={logics.users.isUserLoggedIn() ? <NotFound /> : <Login />} />
            <Route path="/register" element={logics.users.isUserLoggedIn() ? <NotFound /> : <Register />} />
            <Route path="/my-profile" element={logics.users.isUserLoggedIn() ? <MyProfile updateHeader={setRefreshHeader} /> : <NotFound />} />
            <Route path="/profile/:username" element={logics.users.isUserLoggedIn() ? <UserProfile /> : <NotFound />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    </div>
}

export default App