var body = document.body;

var users = [];

/*Función para añadir multiples hijos a el elemento padre que es el primero que pasamos hecha por nosotros para ver más fors*/
function appendChildren() {
    var parent = arguments[0] //el primer elemento es el contendor
    for (var i = 1; i < arguments.length; i++) {
        parent.appendChild(arguments[i])   //añadimos el resto de elementos
    }
    return parent
}

/*Crear un elemento html que contiene texto*/
function createTextContainer(tag, text, style) {
    var element = document.createElement(tag);
    element.textContent = text;
    element.className = style;
    return element
}

/*Crear un botón y le pasa en el parametro "callback" que es la función que se ejecuta al hacer click*/
function createButton(text, style, callback) {
    var button = document.createElement('button');
    button.className = style;
    button.textContent = text;
    button.addEventListener('click', callback) //Se activa la función que hemos pasado como parametro al hacer click
    return button
}

/*Crear un contenedor (un div con estilos definidos)*/
function createContainer(style) {
    var container = document.createElement('div');
    container.className = style;
    return container
}

function createForm(inputsArray, submitButtonText, callback) { //inputsArray = [{label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email'}, {label: 'Password....}]
    var formContainer = document.createElement('form');
    formContainer.className = 'form'
    for (var i = 0; i < inputsArray.length; i++) {
        var input = inputsArray[i] //input[i] = {label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email'}
        var label = document.createElement('label')
        label.htmlFor = input.inputId //input = {... inputId: 'email'}; input.inputId === 'email'
        label.textContent = input.label
        var inputElement = document.createElement('input')
        inputElement.type = input.inputType;
        inputElement.id = input.inputId;
        inputElement.placeholder = input.inputPlaceholder
        inputElement.required = input.isRequired

        appendChildren(formContainer, label, inputElement)
    }

    var submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = submitButtonText

    formContainer.appendChild(submitButton)

    formContainer.addEventListener('submit', function (event) {
        event.preventDefault()

        var form = event.target; // --> elemento form html al que le hemos dado submit
        var formData = {};

        //iterar todos los inputs que he generado en el formulario, de esos inputs quiero acceder al valor que ha escrito el usuario
        for (var i = 0; i < inputsArray.length; i++) {
            //inputsArray = [{ label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email' }, ...]
            // normalmente para acceder al valor de un input a traves del id --> event.target.idDelInput (e.g. event.target.email)

            //form[inputsArray[i].inputId] ---> event.target['email'] === event.target.email
            //console.log(form[inputsArray[i].inputId].value) //<input />.value
            var fieldName = inputsArray[i].inputId;
            var value = form[inputsArray[i].inputId].value

            formData[fieldName] = value; //formData = {'email': 'patata@mail.com'}
        }

        callback(formData)
    })

    return formContainer;

}

function registerUser(registerData) { //registerData = {'email': '', 'password': '', 'confirmation-password': ''}
    if (!registerData['email'] && !registerData['password'] && !registerData['confirmation-password']) { //!registerData['email'] => registerData['email'] === undefined && registerData['email'] === null
        alert('Register Data Incomplete')
        return;
    }
    if (registerData['password'] !== registerData['confirmation-password']) {
        alert('Password and confirmation password are not the same')
        return
    }
    /*Podriamos longitud, y caracteres de la contraseñar, validar que el mail no esta en uso, etc*/

    users.push({ email: registerData['email'], password: registerData['password'], id: Date.now() })
    console.log(users)

}

function createRegisterPage() {
    var registerContainer = createContainer('');
    var registerTitle = createTextContainer('h1', 'Register', '');
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email', isRequired: true };
    var objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password', isRequired: true }
    var objectConfirmPassword = { label: 'Confirm password', inputType: 'password', inputPlaceholder: '*******', inputId: 'confirmation-password', isRequired: true }
    var registerForm = createForm([objectEmail, objectPassword, objectConfirmPassword], 'Register', registerUser)


    var toLoginButton = createButton('Go to login', '', function () { navigateToLogin(view) })
    var view = appendChildren(registerContainer, registerTitle, registerForm, toLoginButton)

    return view

}

/*Crea la nueva vista del register y limpia la vista anterior*/
function navigateToRegister(previousView) {
    var registerView = createRegisterPage()

    body.replaceChild(registerView, previousView)
}

/*Renderiza la vista del login y limpia la vista anterior*/
function navigateToLogin(previousView) {
    var loginContainer = createContainer('');
    var loginTitle = createTextContainer('h1', 'Login', '');
    var loginButton = createButton('Login', '', function () { console.log('click') })
    var toRegisterButton = createButton('Go to register', '', function () { navigateToRegister(loginView) })

    var loginView = appendChildren(loginContainer, loginTitle, loginButton, toRegisterButton)
    body.replaceChild(loginView, previousView)
}


/*Renderizar landing*/
function renderLanding() {
    var landingContainer = createContainer('');
    var landingTitle = createTextContainer('h1', 'PET APP', 'title');
    var joinButton = createButton('JOIN IN!', '', function () { navigateToRegister(landingContainer) })

    landingContainer.appendChild(landingTitle);
    landingContainer.appendChild(joinButton);
    body.appendChild(landingContainer);
}


renderLanding()