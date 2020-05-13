<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## API REST desarrollada con NestJS

* Se crea el proyecto de NestJS.
* Se crea el módulo de temas incluyendo controlador, servicio, repositorio, entidad y dto.
* Se modifica la función "obtenertemas" del controlador Temas para devolver una respuesta personalizada.
* Se controla que si ya existe un tema con un nombre, que devuelva un ConflictException (sqlState = '23000')
* Se crean los tests de temas.service.ts (temas.service.spec.ts)
* Se crean los tests de temas.repository.ts (temas.repository.spec.ts)

