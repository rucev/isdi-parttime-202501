# **Diferencias entre ES5 y ES6 en JavaScript**

## **1. Declaración de Variables**
- **ES5**: Usa `var` para declarar variables. Tiene **scope de función** y permite re-declaraciones.
- **ES6**: Introduce `let` y `const` con **scope de bloque** y evita problemas de re-declaración.
  
  ```js
  // ES5
  var x = 10;
  var x = 20; // No hay error

  // ES6
  let y = 10;
  // let y = 20; // Error: y ya ha sido declarada

  const z = 30;
  // z = 40; // Error: No se puede reasignar una constante
  ```

## **2. Funciones Flecha (`=>`)**
- **ES5**: Se usan funciones tradicionales `function`
- **ES6**: Se introducen **arrow functions**, que tienen un `this` léxico y una sintaxis más corta.

  ```js
  // ES5
  function sum(a, b) {
    return a + b;
  }

  // ES6
  const sum = (a, b) => a + b;
  ```

### **¿Qué es el `this` léxico en JavaScript?**
En JavaScript, el valor de `this` depende de cómo se invoca una función. Tradicionalmente, en **ES5**, `this` puede cambiar dependiendo del contexto de ejecución y cómo se llama la función. Sin embargo, en **ES6**, las funciones flecha (`=>`) introducen el concepto de **"this léxico"**, lo que significa que `this` se determina **según el contexto en el que la función fue definida**, en lugar de cómo se invoca.

#### **Diferencia entre `this` en ES5 y ES6**

##### **ES5: `this` depende del contexto de ejecución**
En ES5, `this` dentro de una función normal depende de **cómo se llama la función**.

```js
function User(name) {
  this.name = name;

  setTimeout(function () {
    console.log("Hola, soy " + this.name);
  }, 1000);
}

const user = new User("Juan");
// Esto imprimirá: "Hola, soy undefined"
```

**Problema:** `setTimeout` ejecuta la función en un contexto diferente, por lo que `this` dentro de la función ya no apunta al objeto `Usuario`, sino al objeto global (`window` en navegadores, `global` en Node.js).

##### **Solución en ES5: Usar `bind()` o una Variable Auxiliar**
Para evitar este problema en ES5, se suele usar `bind()` o una variable auxiliar (`self` o `that`).

```js
function User(name) {
  var self = this; // Guardamos `this` en `self`
  this.name = name;

  setTimeout(function () {
    console.log("Hola, soy " + self.name); // Ahora sí accede correctamente
  }, 1000);
}
```

Otra opción es usar `bind()` para forzar que `this` se refiera a `Usuario`:

```js
function User(name) {
  this.name = name;

  setTimeout(
    function () {
      console.log("Hola, soy " + this.name);
    }.bind(this), // 🔹 `bind(this)` fija el valor de `this`
    1000
  );
}
```

---

#### **ES6: `this` léxico con funciones flecha (`=>`)**
Con ES6, las **arrow functions** (`=>`) solucionan este problema porque **no crean su propio `this`**, sino que heredan el `this` del contexto en el que fueron definidas.

```js
class User {
  constructor(name) {
    this.name = name;

    setTimeout(() => {
      console.log(`Hola, soy ${this.name}`); // `this` apunta correctamente a Usuario
    }, 1000);
  }
}

const user = new User("Juan");
// Esto imprimirá: "Hola, soy Juan"
```

**Solución automática:** Como las funciones flecha no tienen su propio `this`, automáticamente usan el `this` del contexto donde se crearon (en este caso, la instancia de `Usuario`).

---

## **Resumen: ¿Cuándo usar funciones flecha?**
**Usa arrow functions (`=>`) cuando quieres que `this` sea heredado del contexto superior**, como en eventos, `setTimeout()`, `map()`, `forEach()`, etc.

**No uses arrow functions cuando necesitas un `this` dinámico**, como en métodos de clases que podrían ser sobreescritos.

## **3. Template Literals**
- **ES5**: Se usan concatenaciones con `+`
- **ES6**: Se introducen **template literals** usando `` ` `` para facilitar interpolación de variables.

  ```js
  // ES5
  var nombre = "Juan";
  var saludo = "Hola, " + nombre + "!";

  // ES6
  let nombre = "Juan";
  let saludo = `Hola, ${nombre}!`;
  ```

## **4. Parámetros por Defecto**
- **ES5**: Se verifican manualmente los valores `undefined`
- **ES6**: Se pueden definir valores por defecto directamente en la función.

  ```js
  // ES5
  function saludar(nombre) {
    var nombre = nombre || "Invitado";
    console.log("Hola, " + nombre);
  }

  // ES6
  const saludar = (nombre = "Invitado") => console.log(`Hola, ${nombre}`);
  ```

### **5. Destructuring (Desestructuración)**
- **ES6** permite extraer valores de arrays u objetos de manera más sencilla.

  ```js
  // ES5
  var persona = { nombre: "Ana", edad: 25 };
  var nombre = persona.nombre;
  var edad = persona.edad;

  // ES6
  const { nombre, edad } = persona;

  // Con Arrays
  const [primero, segundo] = [1, 2, 3]; // primero = 1, segundo = 2
  ```

## **6. Spread (`...`) y Rest Parameters**
- **Spread** se usa para expandir elementos de arrays u objetos.
- **Rest** se usa para capturar argumentos en una función.

  ```js
  // ES6 Spread
  let numeros = [1, 2, 3];
  let copia = [...numeros, 4, 5]; // [1, 2, 3, 4, 5]

  // ES6 Rest
  function sumar(...numeros) {
    return numeros.reduce((acc, num) => acc + num, 0);
  }
  console.log(sumar(1, 2, 3)); // 6
  ```

## **7. Módulos (import/export)**
- **ES6** introduce `import` y `export` para modularizar código.

  ```js
  // ES6
  // archivo.js
  export const mensaje = "Hola";

  // main.js
  import { mensaje } from "./archivo.js";
  console.log(mensaje);
  ```

## **Buenas Prácticas en ES6 y JavaScript Moderno**
### **1. Uso de `const` y `let` en lugar de `var`**
- Usa `const` para valores que no cambian y `let` para los que sí.
- Evita `var` debido a su **hoisting** y problemas de re-declaración.

### **2. Evitar Variables Globales**
- Usa **módulos** y **closures** en lugar de declarar variables globales.

  ```js
  (function () {
    let privado = "Esto no está en el scope global";
  })();
  ```

### **3. Usa Arrow Functions Cuando Sea Apropiado**
- No uses `function` si no necesitas su `this` dinámico.

  ```js
  const nombres = ["Ana", "Luis", "Juan"];
  const saludos = nombres.map((nombre) => `Hola, ${nombre}!`);
  ```

### **4. Prefiere `Template Literals` en Lugar de Concatenación**
  ```js
  let mensaje = `Hola, ${nombre}! Bienvenido.`;
  ```

### **5. Usa Destructuring para Mayor Claridad**
  ```js
  const usuario = { nombre: "Pedro", edad: 30 };
  const { nombre, edad } = usuario;
  console.log(nombre, edad);
  ```