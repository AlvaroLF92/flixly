Para comenzar el propyecto se ha instalado el CLI de angular con :

-npm install -g @angular/cli

Luego hemos creado el proyecto base utilizando el siguiente comando:

-ng new mi-aplicacion --routing --style=scss

Hemos añadido Angular Material desde el inicio y creado los componentes básicos del proyecto utilizando:

-ng add @angular/material

-ng generate component component-name

Se ha configurado routing en app.routes.ts para utilizar lazy loading y evitar importar cada componente optando por hacerlo únicamente cuando se necesita pasando el import como callback.

Ej: { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },

Se ha inyectado routes en app.config.ts mediante el provider.

-provideRouter(routes),

Se ha creado la estructura básica del proyecto:

app {
    core {
        guards
        services
    }
    layout {
        footer
        header
        private-menu
        public-menu
    }
    pages {
        private {
            crud
            dashboard
            profile
            gallery
        }
        public {
            about
            home
            login
        }
    }
    app.component.html
    app.component.scss
    app.component.spec.ts
    app.component.ts
    app.config.ts
    app.routes.ts

}
index.html
main.ts
styles.css

---

Seguidamente hemos creado el servicio auth.service.ts para realizar la simulacion de validacion y peticiones que tendríamos con un backend y guardar nuestro "token" en LocalStorage para tener persistencia y poder iniciar, mantener y cerrar sesion cuando nosotros queramos.

Despues hemos procedido añadiendo funcionalidad al componente login utilizando dicho servicio.
Se ha creado el template para el login y de momento al iniciar el proyecto carga la pagina de login y muestra un error si no introducimos las credenciales correctas y un log "login correcto" si son válidas, además de otro log que muestra "public" o "private" al recargar la página para asegurarnos de que funciona la persistencia.

Vamos a modificar auth.service antes de crear los guards y continuar para añadir localStorage y contar a partir de aqui con persistencia.

Vamos a continuar utilizando CanActivate para proteger nuestrass rutas privadas con un guard que hemos creado llamado AuthGuard , alojado en core, guards.

 Nuestro routes.ts ha quedado listo,  para continuar,  el siguiente paso es la creacion de los menús públic y private para el header.

Se ha estilado el header con un navegador de material e integrado la lógica para hacer el renderizado condicional de los menús en base a si el usuario está logueado o no, ya se muestran las páginas correspondientes a cada menú, contamos con persistencia de inicio de sesion , guards para las rutas privadas y estilos básicos para la app.

Hemos proseguido con la creacion del componente CRUD que muestra una lista de usuarios de la api pública : 'https://jsonplaceholder.typicode.com/users', y permite , mediante un form de material agregar nuevos usuarios a dicha lista. También podemos eliminar un usuario de la lista y , al hacer click sobre el, en cualquier parte de la fila, se nos abre el menú de detalles para poder editar la info de usuario, esto es a nivel local puesto que al no contar con una api si recargamos la página se nos muestra la lista original de nuevo.

Hemos modificado el login para agregar el delay y el spinner antes de iniciar sesión.

Vamos a agregar la funcionalidad en la pagina de profile, para poder editar el nombre de usuario cuando estamos logueados.

Por último, vamos a añadir la galería de imágenes.

