# Apuntes comandos, terminal, git

## Comandos en la terminal bash
- Crear carpeta: Viene del inglés "make a directory" 
```sh
mkdir <nombre>
```
- Listar carpetas: Abreviatura de "lista"
```sh
ls
```
- Cambiar de carpeta: También del inglés, "change directory"

    - Para entrar a una carpeta:
        ```sh
        cd <nombre-carpeta>
        ```
    - Para salir de una carpeta:
        ```sh
        cd ..
        ```

    - Se pueden "encadenar" manejando "/" entre ellos.
    
        De manera que si tengo una estructura de carpetas como la siguiente y yo estoy en la carpeta con mi nombre...

        ```
        workspace/
        ├── isdi-parttime-202501/
        │		└── staff/
        │			├── flors-rueda/
        │			├── percy-dog/
        │			└── pepito-grillo/
        │
        │
        └── random-code-directory/
            ├── secret-js-experiments/
            ├── no-idea-what-i-have-here/
            ├── HERE-GOAL-DIRECTORY/
            └── broken-things-i-should-fix/
        ```

        ... y lo que quiero es cambiarme a la carpeta "HERE-GOAL-DIRECTORY", podría hacerlo de la siguiente manera:

        ```sh
        cd ../../../random-code-directory/HERE-GOAL-DIRECTORY
        ```

        Por cada `../` salgo una carpeta a fuera (de `flors-rueda` a `staff`, luego de `staff` a `isdi-...` y ya luego de esa a workspace). Y después entra seguido hasta la carpeta objetivo.


### Node y JS:

Podemos ejecutar cualquier código de JavaScript con el siguiente comando:
```sh
node <ruta-al-archivo-o-nombre-del-archivo>
```

### Versiones

Para saber la versión que tenemos instalada, de lo que sea, podemos hacer `-v` o `--version`

```sh
node -v
node --version
git -v
git --version
```

### ¡Ayuda!
También podemos usar `--help` para pedirle información sobre que comandos se pueden usar:

```sh
git --help
node --help
```

## Git
- `git status`: "git, cuentame qué esta pasando por mi repo local"

Ramas:
- `git branch`: "git, ¿qué ramas hay en mi local?"
- `git checkout -b <nombre>`: "git, mueveme a una rama nueva llamada <nombre>"
- `git checkout <nombre>`: "git, mueveme a la rama <nombre> (que ya existia)"
- `git branch -d <nombre>`: "git, elimina la rama <nombre>"

Y también, aunque no se usan tan a diario:
- `git clone <url-repo>`:  "git, cloname el repo de la url en mi local"
- `git config <opciones varias>`: "git, vamos a configurar cosas"

### Git Commit

- `git add <ruta-del-archivo-modificado>`
- `git commit -m "add commit message #issueNumber"`
- `git push`

El mensaje del commit tiene que ser breve, especifico (por eso hay que hacer commits pequeñitos) y estar en inglés. Empiezan con un verbo en infinitivo y luego se precisa que feature y/o archivo se ha trabajado.

Algunos ejemplos de verbos que podéis usar en un commit son:
- **add**: añadir, para cuando se crea algo nuevo (e.g. "add update avatar form").
- **update/modify**: actualizar o modificar algo que ya existía (e.g. "update header colors").
- **delete/remove**: eliminar o quitar, para cuando se borra algo concreto (e.g. "delete comments").
- **fix**: arreglar, para cuando teníamos algo roto y lo hemos arreglado (e.g. "fix login button").
- **refactor**: para cuando se mejora un código que ya existía (e.g. "refactor main.js").

Para cambiar el mensaje del último commit sin pushear:
```sh
git commit --amend -m "New commit message"
```

![](git.png)


Si en algún momento abris vim (prgrama para editar documentos desde el terminal) sin querer (por ejemplo al olvidaros de añadir mensaje al commit) para salir:
- Darle a la tecla "esc"
- Escribir  ":q"
- Darle a enter

## Shortcuts y truquitos
- Con la tecla Tab ↹ podemos autocompletar comandos o rutas
- Con las flechas arriba y a bajo se navega por el los distintos comandos que hemos enviado.

## Recursos útiles
[Te lo explico con gatitos - Git](https://teloexplicocongatitos.com/poster/tlecg04)

[Te lo explico con gatitos - Terminal](https://teloexplicocongatitos.com/poster/tlecg03)

[Traductor potente](https://www.deepl.com/es/translator)
