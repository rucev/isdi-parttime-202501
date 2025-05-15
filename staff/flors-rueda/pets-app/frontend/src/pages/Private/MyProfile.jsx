import { useEffect, useState } from "react"
import Form from "../../components/lib/Form"
import logics from "../../logic/index"
import UserCard from "../../components/UserCard"
import getLoggedUserId from "../../logic/helpers/getLoggedUserId"
import Btn from "../../components/lib/Btn"
import locales from "../../locales"
import useCustomContext from "../../hooks/useCustomContext"

const MyProfile = ({ updateHeader, locale }) => {
    const [showUsernameForm, setShowUsernameForm] = useState(false)
    const [showAvatarForm, setShowAvatarForm] = useState(false)
    const [showBioForm, setShowBioForm] = useState(false)
    const [refreshUserCard, setRefreshUserCard] = useState(Date.now())
    const [tempAvatar, setTempAvatar] = useState()
    const [isLocalAvatar, setIsLocalAvatar] = useState(false)
    const [translations, setTranslations] = useState(locales[locale]['myProfile'])
    const [formTranslations, setFormTranslations] = useState(locales[locale]['forms'])

    const { alert } = useCustomContext()

    useEffect(() => {
        setTranslations(locales[locale]['myProfile'])
        setFormTranslations(locales[locale]['forms'])
    }, [locale])

    const usernameObject = { label: formTranslations.usernameLabel, inputType: 'text', inputPlaceholder: formTranslations.usernamePlaceholder, inputId: 'username', isRequired: true }
    const avatarObject = { label: formTranslations.avatarLabel, inputType: 'file', inputPlaceholder: '', inputId: 'avatar-64', isRequired: false }
    const avatarObject2 = { label: formTranslations.urlLabel, inputType: 'url', inputPlaceholder: 'https/avatar.com/avatar.png', inputId: 'avatar-url', isRequired: false }
    const bioObject = { label: formTranslations.bioLabel, inputType: 'text-area', inputPlaceholder: formTranslations.bioPlaceholder, inputId: 'bio', isRequired: true }

    const onUpdateUsername = (formData, onSuccess) => {
        try {
            logics.users.updateUsername(formData['username'])
                .catch(error => alert(error))
                .then(() => {
                    onSuccess()
                    updateHeader(Date.now())
                    setRefreshUserCard(Date.now())
                    setShowUsernameForm(false)
                })
        } catch (error) {
            alert(error)
        }
    }

    const onUpdateAvatar = (formData, onSuccess) => {
        setIsLocalAvatar(formData['avatar-64'] ? true : false)
        try {
            if (isLocalAvatar) {
                const newAvatar = formData['avatar-64']
                const image = new FileReader();
                image.onload = () => {
                    const base64 = image.result;
                    setTempAvatar(base64)
                };
                image.readAsDataURL(newAvatar)
            } else {
                setTempAvatar(formData['avatar-url'])
            }

            logics.users.updateAvatar(tempAvatar)
                .then(() => {
                    onSuccess()
                    updateHeader(Date.now())
                    setRefreshUserCard(Date.now())
                    setShowAvatarForm(false)
                })
                .catch(error => alert(error))

        } catch (error) {
            alert(formTranslations.errorMsg)
            alert(error)
        }
    }

    const onUpdateBio = (formData, onSuccess) => {
        try {
            logics.users.updateBio(formData['bio'])
                .then(() => {
                    onSuccess()
                    setRefreshUserCard(Date.now())
                    setShowBioForm(false)
                })
                .catch(error => {
                    alert(error)
                })

        } catch (error) {
            alert(formTranslations.errorMsg)
            alert(error)
        }
    }

    const onChangeTemporal = (newTempAvatar, isBase64Avatar) => {
        setIsLocalAvatar(isBase64Avatar)
        setTempAvatar(newTempAvatar)
    }

    const onRandomBioClick = () => {
        try {
            logics.users.getRandomBio()
                .then((randomBio) => {
                    logics.users.updateBio(randomBio)
                        .then(() => {
                            setRefreshUserCard(Date.now())
                            setShowBioForm(false)
                        })
                        .catch(error => {
                            alert(error)
                        })
                })
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    return <div className="main-container">
        <UserCard userId={getLoggedUserId()} refreshSelf={refreshUserCard} tempAvatar={tempAvatar} isMyProfile={true} />
        <div className="account__section-title" onClick={() => setShowUsernameForm(!showUsernameForm)}>
            <h2>{translations.usernameTitle}</h2>
            <i className={`bi bi-chevron-compact-${showUsernameForm ? 'up' : 'down'}`}></i>
        </div>
        {showUsernameForm && <Form inputsArray={[usernameObject]} onSubmitCallback={onUpdateUsername} submitButtonText={formTranslations.updateSubmit} />}
        <div className="account__section-title" onClick={() => setShowAvatarForm(!showAvatarForm)}>
            <h2>{translations.avatarTitle}</h2>
            <i className={`bi bi-chevron-compact-${showAvatarForm ? 'up' : 'down'}`}></i>
        </div>
        {showAvatarForm && <Form inputsArray={[avatarObject, avatarObject2]} onSubmitCallback={onUpdateAvatar} submitButtonText={formTranslations.updateSubmit} onFileChangeCallback={onChangeTemporal} />}
        <div className="account__section-title" onClick={() => setShowBioForm(!showBioForm)}>
            <h2>{translations.bioTitle}</h2>
            <i className={`bi bi-chevron-compact-${showBioForm ? 'up' : 'down'}`}></i>
        </div>
        {showBioForm && <Form inputsArray={[bioObject]} onSubmitCallback={onUpdateBio} submitButtonText={formTranslations.updateSubmit} />}
        {showBioForm && <div className="account__bio"><b>{translations.noIdea}</b><p>{translations.random}</p><Btn btnContent={translations.randomBtn} btnCallback={onRandomBioClick} btnClassnames={'account__random-bio-btn'} /></div>}
    </div>
}

export default MyProfile