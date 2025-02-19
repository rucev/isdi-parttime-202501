var body = document.body;

/*Función para añadir multiples hijos a el elemento padre que es el primero que pasamos hecha por nosotros para ver más fors*/
function appendChildren() {
    var parent = arguments[0]
    for (var i = 1; i < arguments.length; i++) {
        parent.appendChild(arguments[i])    //TODO --> investigar como calcular el rendimiento
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

/*Renderiza la vista del register y limpia la vista anterior*/
function navigateToRegister(previousView) {
    var registerContainer = createContainer('');
    var registerTitle = createTextContainer('h1', 'Register', '');
    var registerButton = createButton('Register', '', function () { console.log('click') })
    var toLoginButton = createButton('Go to login', '', function () { navigateToLogin(registerView) })

    var registerView = appendChildren(registerContainer, registerTitle, registerButton, toLoginButton);
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