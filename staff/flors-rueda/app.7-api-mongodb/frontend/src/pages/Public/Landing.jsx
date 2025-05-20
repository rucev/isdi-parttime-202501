import { useEffect, useState } from "react"
import Logo from "../../components/lib/Logo"
import locales from "../../locales"

const Landing = ({ locale }) => {
    const [translations, setTranslations] = useState(locales[locale]['landing'])

    useEffect(() => {
        setTranslations(locales[locale]['landing'])
    }, [locale])



    return <div className="landing__content flex flex-col gap-3 justify-center items-center">
        <h1 className="landing__title">{translations.appName}</h1>
        <Logo size={"lg"} />
        <h2 className="landing__subtitle">{translations.subtitle}</h2>
    </div>
}

export default Landing