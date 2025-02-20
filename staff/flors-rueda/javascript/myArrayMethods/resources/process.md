# TDD Arrays Process

## 1. Buscar la documentación

Buscar el método en [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

## 2. Leer la documentación e interpretarla

- Ver como se utiliza para poder ejecutarla en nuestro test
- Analizar que variables se le pasan como parametro (nuestros myArray siempre tendrán como minimo el parametro con el propio array)
- Leer qué hace esa función:
    1. Modifica el array original (this)?
    2. Crea una copia de ese array (shallow copy)?
    3. Hace una tercera cosa distinta (devuelve algo pero no modifica ni copia nada)
- Mirar qué devuelve la función (para saber que tenemos que añadirl al return de nuestra función)
- Tomar nota de casos límite (e.g. pasar un array vacio, un index que no existe, etc)

## 3. Crear las variables necesarias para el código
Normalmente serán:
- array control --> aplicaremos el metodo pop nativo de js
- array de test --> aplicaremos el metodo que hemos hecho nosotros
- element control --> almacena lo que devuelve el pop nativo de js
- element de test ---> almacena lo que devuelve nuestro pop

## 4. Ejecutar la función nativa de js con sus variables de control.

## 5. Crear el primer `console.assert`
Por ejemplo, si la función modifica el array original hacer un assert (en un for) que compara el array control con el array test.

Una vez esta creado podemos comprobar que falla (o debería fallar)

## 6. Añadir a nuestra función myArray() el código necesario para que cumpla el test

Y comprobamos que lo cumple todo ok

## 7. Repetir los pasos 5 y 6 para cada caso que pueda dar la función
Por ejemplo:
- modifica el array original --> un test para eso (paso 5, paso 6)
- devuelve un valor concreto ---> un test para eso (paso 5, paso 6)
- si el array no tiene length, devuelve otra cosa --> un test para eso (paso 5, paso 6)
- si le pasas dos arrays hace una cosa totalmente distinta --> un test para eso (paso 5, paso 6)