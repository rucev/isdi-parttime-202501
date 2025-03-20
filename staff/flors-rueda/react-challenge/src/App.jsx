const useState = React.useState //Nos traemos el hook useState de react
const useEffect = React.useEffect //Nos traemos el hook useEffect de react

const App = () => {
    const [showForm, setShowForm] = useState(true)
    /*PASO 6: añade aquí el estado de words, usando useState*/
    /*PASO 7: añade un estado llamado timeStamp cuyo valor por defecto sea Date.now()

    /*PASO 6: añade aquí tu useEffect*/
    /*PASO 7: añade el timeStamp al array de dependencias del useEffect*/

    const handleNavClick = () => {
        /*PASO 2: setea un nuevo valor para showForm*/

        /*PASO 7: cambia el valor del timeStamp para asegurarte que se actualiza el array de words cuando se navegue a la vista correspondiente*/
    }

    const handleSendNewWord = (newWordFormData) => {
        console.log(newWordFormData) /*PASO 4: Elimina este console.log cuando ya no te haga falta! */
        /*PASO 4: Añadé aquí la palabra función de data para añadir la palabra que quieres guardar*/
        /*PASO 4: una vez se guarde la palabra, cambia el estado de showForm para que pase a mostrarte la lista de palabras*/

        /*PASO 7: cambia el valor del timeStamp para asegurarte que se actualiza el array de words*/
    }

    const handleDeleteWord = (wordIndex) => {
        data.words.deleteByIndex(wordIndex)

        /*PASO 8: toca añadir algo aquí, para que se actualice el array que se esta mostrando. Piensa en el paso anterior*/
    }

    return (<div className="main-container">
        <Btn
            className={'navigation-button'}
            btnCallback={{/*PASO 2: Llama a la función que setea un nuevo valor para showForm*/ }}
            btnContent={showForm ? 'Ir a lista de palabras' : 'Añadir más palabras' /*PASO 2: fijate que aquí ya hay un condicional en base a showForm. Si el texto del botón cambia cuando haces click, es que has implementado bien el código dentro de handleNavClick*/}
        />
        {/*PASO 2: Añade condicionales: si showForm es true que se muestre el siguiente formulario*/
            <p>Aquí va el form</p>
            /*PASO 3: Reemplaza este <p> por el componente de formulario*/
        }
        {/*PASO 2: Añade condicionales: si showForm es false que se muestre la lista*/
            <p>Aquí va la lista</p>
            /*PASO 5: Reemplaza este <p> por el componente de la lista*/
        }

    </div>);
}
