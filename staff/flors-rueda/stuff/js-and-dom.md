# Apuntes de JS y acceso al DOM

[Link a la documentación](https://developer.mozilla.org/en-US/docs/Web/API/Document)

## Acceder al DOM desde JS

Llamando a la palabra reservada `document` desde javascript podemos acceder a todo lo que contenga el DOM. Por ejemplo, para traernos el body y poder añadirle contenido dinamico a nuestra web podemos usar:

```js
var body = document.header;
```

## Creación dinámica de elementos

Podemos crear un nuevo elemento con la función `document.createElement()`.

Por ejemplo, la siguiente función:
```js
var title = document.createElement('h1')
```

Almacenaría en la variable `title` el siguiente elemento:

```html
<h1></h1>
```

### Añadir contenido de texto para mostrar en la interfaz de usuario

Si queremos que el titulo tenga un texto que mostrar en pantalla deberiamos añadirlo usando alguno de estos métodos:

```js
title.textContent = 'Hola Mundo';
title.innerHTML = 'Hola Mundo';
```

Lo cual actualizaría el elemento anterior a lo siguiente
```html
<h1>Hola Mundo</h1>
```

Como vemos, hay dos métodos para hacerlo pero eso no significa que los dos hagan exactamente lo mismo. ¿Cuál es la diferencia?

Digamos que queremos añadir un texto en cursiva dentro del titulo, especificamente la palabra *Mundo*. Con `innerHtml` podemos hacer lo siguiente:

```js
title.innerHTML = 'Hola <i>Mundo</i>'
```

y en pantalla se mostraria con el resultado deseado. Sin embargo, con `textContent` el mismo proceso no funcionaria. Se renderizaría un texto en el que literalmente se vería 'Hola \<i>Mundo\</i>'.

Para hacerlo de forma correcta usando textContent deberiamos:

```js
var world = document.createElement('i');
world.textContent = 'World';
title.textContent = `Hello ${world}`
``` 

¿Por qué deberiamos usar una función que supone algunos pasos extra para hacer lo mismo? `textContent` es la forma más segura.

Con `innerHtml` se insterta contenido html directo, esto tiene dos desventajas importantes:
- Vuelve el código vulnerable a ataques de [XSS (Cross-Site Scripting)](https://www.cloudflare.com/learning/security/threats/cross-site-scripting/).
- Se analiza y procesa el html antes de inyectarlo, así que tiene un rendimiento algo menor.

### Añadir estilos al elemento

Existen tres formas de añadir estilos al elemento. La más directa es usando:


#### `.style`
```js
title.style.color = 'red';
title.style.fontSize = '5rem';
```

```html
<h1 style="color: red; font-size: 5rem">Hola Mundo</h1>
```

Es útil para cambios rápidos, pero no es reutilizable y si hay mucho código se vuelve difícil de gestionar.

Alternativamente, podemos añadir una clase construida en una hoja de estilos de css, como por ejemplo esta:

```css
.titleStyle {
  color: red;
  font-size: 5rem;
}
```

Esta clase podriamos añadirla de una de las siguientes maneras:

#### `.className`

```js
title.className = 'titleStyle';
```

#### `.classList.add()`
```js
title.classList.add('titleStyle');
``` 

Y en este caso, ¿cuál es la diferencia?

`.className` sobreescribe cualquier clase previa, siendo especialmente útil para limpiar estilos si es necesario.

En cambio, `.classList.add()`simplemente añade las clases a las ya existentes, permitiendo combinar ese estilo con otros anteriores.

## Añadir funcionalidad a esos elementos

### Determinar el tipo de input o botón

Para manejar entradas del usuario, podemos definir un input o un button en nuestro código. Por ejemplo, para crear un campo obligatorio de tipo texto con un limite de 8 caracteres como mucho podriamos:

```js
var input = document.createElement('input');
input.type = 'text';
input.id = 'name';
input.required = true;
input.maxlength = 8;

```

crearia un

```html
<input type="text" id="name" required maxlength="8" />
```
¿Y si quisieramos añadirle una label en base a su id?

```html
<label for="name">Here goes your name</label>
```

```js
var label = document.createElement('label');
label.for = input.id;
```

### Eventos

Podemos asignar eventos a los elementos para que respondan a la interacción del usuario.

Podemos asignarlo a un elemento especifico, haciendo que se active cuando el usuario interactue unicamente con ese elemento. O asignarlo a todo el script, de forma que se active en cualquier momento que se haga ese evento en la página:

```js
var button = document.createElement('button');

button.addEventListener('click', function() {
    alert('Button clicked!');
});

addEventListener('click', function() {
    alert('Anything clicked!')
});

```

#### Acceder a los valores de un input en un formulario al hacer submit

Si tenemos un formulario con un input, podemos capturar su valor cuando el usuario lo envíe:

```js
var form = document.createElement('form');
var input = document.createElement('input');
input.type = 'text';
input.id = 'name';
var submit = document.createElement('input');
submit.type = 'submit';
form.appendChild(input);
form.appendChild(submit);

document.body.appendChild(form);

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado de refrescar la página al enviar el formulario
    var _form = event.target // El objetivo del evento es el form, así que se trae dicho elemento
    alert('Te llamas ' + _form.name.value); //accede al input de id name y obtiene el valor dado por el usuario
});
```
#### Ejemplos de eventos:

##### Eventos con el ratón
- `'click'` → Cuando se hace clic.
- `'dblclick'` → Doble clic.
- `'mouseenter'` → Cuando el cursor entra en el elemento.
- `'mouseleave'` → Cuando el cursor sale.
- `'mousemove'` → Cuando el cursor se mueve sobre el elemento.

##### Eventos de teclado
- `'keydown'` → Cuando se presiona una tecla.
- `'keyup'` → Cuando se suelta una tecla.

##### Eventos de formulario
- `'submit'` → Cuando se envía un formulario.
- `'change'` → Cuando cambia el valor de un input/select.

##### Eventos de carga y redimensionado
- `'load'` → Cuando la página o imagen ha terminado de cargarse.
- `'resize'` → Cuando la ventana cambia de tamaño.
- `'scroll'` → Cuando se hace scroll en la página.

##### Eventos táctiles
- `'touchstart'` → Cuando el usuario toca la pantalla.
- `'touchmove'` → Cuando el usuario mueve el dedo en la pantalla.
- `'touchend'` → Cuando el usuario levanta el dedo.

#### Eliminar o frenar addEventListener

Si la función a la que llamamos en el addEventListener tiene nombre (es decir, no es anónima) podemos eliminarlo con `removeEventListener()`

```js
function activate() {
    alert('Active Event!');
}

button.addEventListener('click', activate);

// Para eliminarlo:
button.removeEventListener('click', activate);
```

El próximo ejemplo **NO** funcionaria:

```js
button.addEventListener('click', function() {
    alert('That would NOT work');
});

button.removeEventListener('click', function() {
   alert('That would NOT work'); // X No funciona
});
```

TAmbién hay que tener en cuenta la función `event.stopPropagation()` que frena la ejecución de un evento a elementos padres, evitando que los manejadores de eventos en elementos superiores del DOM se activen.

Es útil cuando hay eventos anidados y no queremos que el evento de un elemento hijo active también el del padre.

Recordemos este ejemplo:

```js
var button = document.createElement('button');

button.addEventListener('click', function() {
    alert('Button clicked!');
});

addEventListener('click', function() {
    alert('Anything clicked!')
});

```
Al hacer clic en el botón, se activa su evento y muestra: "Button clicked!".
Pero como el evento 'burbujea', también se activa el evento general, mostrando: "Anything clicked!".

En caso de que quisieramos que solo mostrara click al botón al pulsarlo y en caso de pulsar cualquier otro sitio mostrara el otro mensaje, de forma excluyente y no combinandose podríamos:

```js
var button = document.createElement('button');

button.addEventListener('click', function(event) {
    event.stopPropagation(); 
    alert('Button clicked!');
});

addEventListener('click', function() {
    alert('Anything clicked!')
});
```

Existe otro metodo llamado `stopImmediatePropagation()`. ¿En que se diferencia con el anterior? Imaginemos que el código en este caso es el siguiente:
```js
button.addEventListener('click', function(event) {
    event.stopPropagation();
    alert('First Event on Button click!');
});

button.addEventListener('click', function() {
    alert('Second Event on Button click!');
});

addEventListener('click', function() {
    alert('Anything clicked!')
});
```

En este caso al pulsar el botón se activa el alert de 'First Event on Button click!' y también el de 'Second Event on Button click!' pero nunca el de 'Anything clicked!'. Para bloquear la ejecución del alert 'Second Event on Button click!' podemos usar `stopImmediatePropagation()`.

```js
button.addEventListener('click', function(event) {
    event.stopImmediatePropagation();
    alert('First Event on Button click!');
});

button.addEventListener('click', function() {
    alert('Second Event on Button click!');
});

addEventListener('click', function() {
    alert('Anything clicked!')
});
```

## Añadir el elemento creado al DOM

### `.appendChild()`

Usamos appendChild() para añadir un nuevo elemento en el interior del que mencionamos:

```js
body.appendChild(title);
```

Daría como resultado:
```html
<body>
    <h1>Hola Mundo</h1>
</body>
```

### `.replaceChildren()`

Si quisieramos reemplazar todos los hijos de un elemento de una vez, podemos usar replaceChildren():

```js
var newTitle = document.createElement('h1');
newTitle.textContent = 'Nuevo Hola Mundo';

body.replaceChildren(newTitle, title);
```

Con esto se elimina el contenido `title` previo dentro de `<body>` y se añade el definido en la variable `newTitle`


## Encontrar elementos ya creados:

Si en algún momento quisieramos acceder a elementos del DOM que no tenemos en variables del script podriamos usar:
### `.getElementById()`
Nos permite acceder a un elemento que tenga un id específico:
```js
var nameInput = document.getElementById('name'); //traeria el input con id name
```

### `.querySelector()`

Nos permite buscar un elemento con un selector CSS:
```js
var elemento = document.querySelector('.titleStyle'); //traeria el elemento que tenga la clase titleStyle
```
```js
var elemento = document.querySelector('#name'); //traeria el elemento que tenga el id name
```

Si queremos traer todos los elementos que coincidan con un selector en una [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) (no es exactamente un array, pero se puede iterar con un for y tiene length), usamos `querySelectorAll()`:

```js
var elementos = document.querySelectorAll('p'); //Traeria todos los <p> en una NodeList
```