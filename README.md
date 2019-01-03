# Fullstack test for Spacefit

El objetivo de esta prueba es comprobar que el candidato tiene los conocimientos básicos requeridos para incorporarse como desarrollador Fullstack a Spacefit.

El stack de esta prueba es:
- Express
- ReactJS
- MySQL

Para la autenticación se usará Passport.js

Se permite el uso de cualquier otra librería que el candidato crea conveniente.

Se valorará la calidad el código y el funcionamiento completo de la aplicación entregada.

## Descripción de la prueba

El candidato deberá crear una aplicación completa con un listado de películas y actores.

La página principal será un formulario de login/registro, ya que la aplicación es "privada". 

Una vez el usuario se registre/haga login, podrá acceder al listado de películas. En dicho listado se podrá filtrar por nombre y género.

Desde el listado se podrá acceder a la ficha de una película, la cual detallará los actores que han trabajado en ella.

Un usuario podrá añadir/quitar películas de su "watchlist" mediante un icono.

Este es el modelo de la base de datos:

![database model](https://resources.spacefit.app/static/test/spacefit-test-db.png)

Como añadido opcional, se podrá crear una ficha de actor en la que se listarán todas sus películas.

## Backend

En la parte de backend, se han dejado preparados todas las migraciones, modelos y seeders necesarios, así como algunas rutas (protegidas y públicas) con ejemplos sobre cómo usar los modelos. 

### Login y Registro

La funcionalidad de login y registro está lista para funcionar. Se usan JWT que se deben enviar como en un header en cada petición, de la siguiente manera:
```
Authorization: Bearer {token}
```

Las rutas para login y registro son `POST  /login` y `POST /register` respectivamente. Login espera recibir dos parámetros con nombre `email` (correo electrónico) y `password` (contraseña), y registro espera recibir tres parámetros con nombre `name` (nombre del usuario), `email` (correo electrónico) y `password` (contraseña)

### Modelos y migraciones

El servidor usa la librería **Sequelize** para hacer consultas a la base de datos. Funciona de forma muy parecida a otros ORM como Mongoose, Eloquent...

Se puede encontrar la documentación haciendo click [aquí](http://docs.sequelizejs.com/):

Para montar la base de datos con registros de prueba tendremos que ir al archivo de configuración `/config/config.js` y cambiarlo para coincidir con las credenciales de la máquina local. Después, habrá que ejecutar el siguiente comando:
```
npm run init
```

Una vez ejecutado este comando la base de datos habrá sido montada y rellenada con datos de forma automática. Esto podéis comprobar con cualquier software que os permita ver vuestra base de datos o haciendo una consulta (habiendo iniciado sesión) a la ruta `localhost:4000/movies`

### Inicio del servidor

Para iniciar el servidor se tendrá que ejecutar el siguiente comando: 
```
npm start
```
Aunque por conveniencia se recomienda instalar la libería **Nodemon** y así no tendremos que abrir y cerrar el servidor cada vez que haya algún cambio en el código. Para instalarlo de forma global, tendremos que ejecutar:
```
npm install -g nodemon
```
y después podremos ejecutar simplemente:
```
nodemon
```

El servidor estará escuchando en el puerto **4000**.

## Frontend

En la parte de frontend, al contrario que en la de backend, no hay nada preparado. Todo se tendrá que hacer desde cero, partiendo de una plantilla básica creada con `create-react-app`. El diseño se tendrá en cuenta, pero no será lo principal, así que recomendamos centrarse en la funcionalidad y utilizar alguna librería de estilos.
