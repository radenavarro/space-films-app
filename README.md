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
