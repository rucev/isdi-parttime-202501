var body = document.body;

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

function createForm(inputsArray, submitButtonText) { //inputsArray = [{label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email'}, {label: 'Password....}]
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

        appendChildren(formContainer, label, inputElement)
    }

    var submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = submitButtonText

    formContainer.appendChild(submitButton)

    formContainer.addEventListener('submit', function (event) {
        event.preventDefault()
        var formEvent = event.target;
        var values = []
        for (var i = 0; i < inputsArray.length; i++) {
            var type = inputsArray[i].inputType // e.g. email 
            console.log(formEvent[type].value) //event.target.email
        }

    })

    return formContainer;

}

function createRegisterPage() {
    var registerContainer = createContainer('');
    var registerTitle = createTextContainer('h1', 'Register', '');
    var objectEmail = { label: 'Email', inputType: 'email', inputPlaceholder: 'my@email.com', inputId: 'email' };
    var objectPassword = { label: 'Password', inputType: 'password', inputPlaceholder: '*******', inputId: 'password' }
    var registerForm = createForm([objectEmail, objectPassword], 'Register')


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