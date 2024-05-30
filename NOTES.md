# Notas

## Tests unitarios
Los tests son requerimientos/especificaciones.

Que es un unidad (unit)? Son Métodos, clases o módulos.

Una ventaja de los test unitarios es el capturar bugs de forma temprana.

Los tests unitarios imponen una alta calida de código, si es dificil testear algo es porque hay algún problema en el código y debe ser mejorado.

Previenen las interminables pruebas manuales.

Una aplicación TODO list no necesita tests, solo cuando pensamos en algo grande.


### Estructura de una prueba unitaria correctamente escrita:
Principios AAA:
- arrange (organizar): se organiza y se prepara el sistema o los colaboradores para nuestra prueba
- act (actuar): se ejecuta el método o la acción que vamos a probar
- assert (verificar): verificamos que el resultado obtenido sea el resultado que nosotrs estamos esperando

Otros principios:
- setup (configuración): similar a arrange, de momento no se ve en el curso
- teardown (deshacer): para destruir o deshacer los cambios generados tras la ejecución de una prueba, utilizados para pruebas más complejas, de momento no se ve en el curso

## Jest: métodos, hooks y otras cosas
- Métodos
  - toBe() --> para valores primitivos
  - toEqual() --> para objetos
  - toBeTruthy() --> para comprobar si está o no definido un objeto cuando no estamos seguros de la estructura que recibimos
- hooks: nos ayudarán a reducir la duplicidad de código porque muchas veces este paso de configuración (setup) será el mismo para todas las pruebas, lo ponemos en un solo gancho y será llamado en cada prueba. __El contexto o scope en el que actuan es muy importante, se ejecutan siempre en relación a su bloque describe, si se pone en un archivo de nivel superior, es decir, fuera del describe, se ejecutarán antes de cada prueba, pero una buena práctica es poner todos nuestros hooks dentro del bloque describe__
  - beforeEach: en la mayoría de los casos para la configuración (setup) de cada test incluso parte de la organización (arrange)
  - afterEach: generalmente utilizado para limpiar mocks
  - beforeAll: lo usamos menos, por lo general se utiliza cuando hacemos pruebas de integración. Por ejemplo, inicializar una conexión a una base de datos
  - afterAll: lo usamos menos, por lo general se utiliza cuando hacemos pruebas de integración. Por ejemplo, desmontar la conexión a la base de datos
- test properties:
  - only: para ejecutar suites o pruebas específicas (esta propiedad tiene algunos alias)
  - skip: para saltar suites o pruebas específicas (esta propiedad tiene algunos alias)
  - todo: para indicar que la implementación para ese test aún se debe hacer. Muy útil para definir el esqueleto de nuestras pruebas o con TDD por ejemplo
  - concurrent: para ejecutar varias pruebas en simultaneo
- test aliases: son la misma cosa pero con nombres diferentes
  - it: igual a test
  - test: igual it
  - xit: igual a it.skip o test.skip
  - fit: igual a it.only o test.only
- watch mode: nos facilita la ejecución frecuente de nuestros tests
  - Podemoes hacerlo agregando la config `watch: true` en la config de jest o agregando el flag `--watch` en el comando para ejecutar nuestros tests
- Recetas: https://github.com/microsoft/vscode-recipes
  - En este caso para Jest: https://github.com/microsoft/vscode-recipes/tree/main/debugging-jest-tests
    - Otra de hacerlo es ejecutando el comando de test desde la terminal de debug JavaScript "JavaScript Debug Terminal" en la lista de terminales disponibles en VScode
- istanbul ignore: https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md
  - Es una biblioteca que utilizan todos los principales frameworks de pruebas de JavaScript
  - Entre otras cosas podremos eliminar partes específicas de nuestro código del informe de covertura

## Principios F.I.R.S.T
Esto se trata de un principio, no una regla, que podemos seguir a la hora de escribir nuestras pruebas.
- Fast (rápido)
- Independent (independiente)
- Repeatable (repetible)
- Self-validating (autovalidante)
- Thorough (exhaustivo)

### Fast (rápido)
- Los test unitarios deben ser rápidos.
  - En general tests más rápidos significa obtener feedback más rápido.

Esto no significa que deban ser pocas, podríamos tener cientos, miles o más tests unitarios, por esto es que deben ser rápidos.

### Independent/isolated (independiente)
- Los tests deben ser aislados de:
  - Otros tests
  - Entornos externos:
    - Pruebas sin estado compartido no deben compartir estado con otros tests
    - El orden en que se ejecutan los tests no debería importar
    - Contradicción con el principio F(fast):
      - Tests individuales toman más tiempo de configuración

### Repeatable (repetible)
- Para la mismo entrada deberíamos obtener el mismo resultado:
  - Reto: Pruebas que comprueban valores aleatorios o de fecha (siempre cambiarán), en estos casos vamos a utilizar mocks
- Ejemplo: tests que escriben en una base de datos (compartiran algún tipo de estado con otros tests):
  - Esto significa que despues de escribir en una base de datos siempre debemos limpiarla luego de ejecutado el test
- Contradicción con el principio F(fast):
  - Necesitamos más configuración y operaciones de desmontaje/limpieza si queremos que sean repetibles

### Self-validating (autovalidante)
- Luego de que un test finaliza, su resultado debe ser limpiado
  - Pass/fail: Una prueba debe pasar o fallar

### Thorough (exhaustivo)
- Cubrir todos los casos/caminos/escenarios
  - Difícil pensar en todos ellos desde el principio
- Siempre deberíamos probar:
  - Casos felices
  - Casos malos
  - Casos extremos
  - Malos paths
  - Entradas inválidas
  - Valores grandes
- Una cobertura del 100% del códgio no es un gran indicador
  - No significa que tengamos pruebas exhaustivas
  - Es un indicador de la calidad del código
  - No es un buen indicador de la minuciosidad de la pruebas
  - Debemos asegurarnos de escribir tests para el mayor número de posibles casos de uso

### Ilustración
- Un tester entra a un bar:
  - Se encuentra con un bar
  - Ingresa al bar
  - Baila en el bar
  - Salta en el bar
  - Y ordena:
    - Una cerveza
    - 2 cervezas
    - 0 cervezas
    - 1 millon cervezas
    - -1 cervezas
    - A cerveza Lizard 
- Pruebas completadas 🙂

- Un cliente real ingresa al bar
  - Pregunta donde está el baño
- Sistema roto (por no tenerlo implementado)

## TDD (Test Driven Development o desarrollo dirigido por pruebas)
- Reglas clave de TDD
  - Primero debemos escribir nuestras pruebas, con esto sabremos desde el principio exactamente qué requisitos tenemos par nuestro código
  - Luego escribir nuestra implementación
- Un desvio en grandes proyectos
  - En proyectos con 1 o 2 millones de líneas de código no queremos empezar escribiendo 2 o 3 millones de líneas de código de pruebas para luego escribir la implementación, no funciona así
  - Primero debemos alcanzar un estado de funcionamiento (cuando sabemos exactamente o tenemos una idea de cómo será la aplicación, que frameworks utilizaremos, qué patrones de diseño, etc) y luego escribir pruebas
- TDD es excelente para ampliar una aplicación y corregir errores
- El ciclo TDD (rojo, verde, azul)
  - Test fallido (rojo): primero escribimos las pruebas y como no hay implementación, estas fallarán
  - Test pasado (verde): escribiremos la implementación para que los tests pasen
  - Cambiar/añadir lógica (azul): finalmente somo libres para cambiar o agregar lógica

### Codgin project: password checker
- Simples requerimientos, grandes complicaciones
- Requerimientos
  - Iteración 1: simple implementación pero fue difícil hacer pruebas, indicador de una mala implementacón y deberíamos refactorizar o adoptar otro enfoque que facilite la spruebas
    - Una contraseña es inválida si:
      - Longitud menor a 8 caracteres
      - No tiene una letra mayúscula
      - No tiene una letra minúscula
  - Iteración 2: aquí tambien nos ocupamos de refactorizar la implementación para facilitar los tests
    - Retornar la razón de ser inválida
  - Iteración 3: aquí también refactorizamos la clase PasswordChecker para que sea más legible
    - La contraseña de administrador también debe contener un número
- Ejercicio de codificación 1: [Game coding exercise](/src//app/game_coding_exercise/)

## Test doubles (dobles de prueba)
Una analogía es en las películas cuando utilizan un doble en lugar del actor real
- ¿Qué son y porqué los necesitamos?
  - Los necesitamos porque algunas unidades no son ápidas o no son fácilmente accesibles, entonces las reemplazamos en nuestros tests, por ejemplo una base de datos
  - Son objetos ficticios que podemos utilizar en lugar de un objeto real con fines prueba
  - Tipos en orden de dificultad/complejidad ascendente:
    - Dommu objects: simplemente se pasa pero no se utiliza 
    - Fakes: simplifican el trabajo de implementación de implementaciones que toman un atajo. Por ejemplo, un servicio que accede a otro servicio el cual accede a un servicio de inicio de sesión, el cual accede a una base de datos, etc, etc, quí podemos hacer un falso servicio de login que simplemente devuelva true o false en base a nuestros requerimientos
    - Stubs: son objetos incompletos utilizados como argumentos
    - Spies: son objetos que rastreaninformación sobre cómo se llama a una unidad
    - Mocks: se los programa con expectativas
  - Nota de Jest: mocks y spies tienen mucho en común, a veces la documentación puede resultar un poco engañosa
  - Nota de popularidad: spies y mocks son la forma más popular de utilizar dobles de prueba
  - Nota de mocks: 
    - El cómo usarlos es muy debatido
    - La forma en que los utilizamos influye enormemente en la forma que escribimos las pruebas
    - Si los utilizamos demaciado, es indicio de que hay algo mal en nuestro código
    - Existen diferentes estilos de testear/mockear como London/Chicago

### Stubs
Lo importante es que no deberíamos utilizarlos dentro de nuestras aserciones, son los objetos auxiliares que nos ayudan a realizar pruebas

### Fakes
No son más que implementaciones simplificadas de diferentes funcionalidades que utilizamos, una limitante de estos es que no podemos afirmar nada sobre ellos, para eso necesitamos un ojeto de pruebas fake más complejo (mocks)

### Mocks
Podemos crearlos nosotros mismos a mano o Jest nos puede asistir en esa dirección. De estos objetos podemos obtener mucha más información para hacer afirmaciones sobre ellos

### Spies
Aunque mantienen muchas de las funcionalidades que también ofrecen los mocks, hay algunas diferencias en la forma de trabajar de los spies
- Spies vs Mocks:
  - Los Spies no se injectan directamente en SUT (system under test), solo proporciona una funcionalidad diferente en la que estamos utilizando spies
  - Los Spies mantienen la funcionalidad original que espían
  - Los Spies suelen ser utilizados para rastrear las llamadas a métodos dentro de los objetos
- La mejor forma de entender cómo funcionan los Spies es trabajando con clases en lugar de funciones.
- Tambien pueden espiar módulos externos
- Otra cosa para lo que se usan los Spies es para cambiar la implementación de un cierto método
  - Un ejemplo de esto podría ser un método que llama a algún servicio de Internet y no queremos que eso ocurra desde nuestras pruebas unitarias

### Mocking modules
Con `jest.mock` podemos simular módulos enteros o solo partes, incluso si son módulos nuestros o externos

## Test doubles en la práctica
- TDD estilos/escuelas: London y Chicago (Detroit)
  - Los nombres son solo para impresionar no significan nada en cuanto al estilo
  - Representan algunas formas enq ue podemos utilizar mocks
- Entender las diferencias en estilos de pruebas
  - Para saber qué estilo adoptar una pregunta clave que debemos repsonder es ¿Qué es una unidad?
    - Una clase?
    - Una función?
    - Una funcionalidad?
  - Responder esto adecuadamente producira tener un estilo adecuado de pruebas unitarias
- Chicago
  - Adopta un enfoque bajo en mocks
  - Una unidad es una colección de piezas
  - Las pruebas son más complejas y se realizan desde una perspectiva mucho más amplia, esto significa que varios componentes se prueban juntos
  - Hace poco uso de mocks
- London
  - Adopta un enfoque de uso intensivo de mocks
  - Una unidad es una clase
    - Debemos mockear todas sus dependencias
- Recomendaciones del profesor en base a su experienia
  - Tener un enfoque moderado es lo mejor
  - La mejor forma de definir una unidad es "una unidad" = "un requerimiento"
    - Si una unidad es un requerimiento, también las pruebas deben reflejar ese requerimiento
    - Si nuestras unidades son requerimientos, nuestras pruebas serán muy potentes

### Aplicación simple de gestión de reservaciones
- Requerimientos
  - Los usuarios pueden registrarse con un username y password
  - Los usuarios pueden iniciar sesión con un username y password
  - Los usuarios que iniciaron sesión pueden crear, ver, actualizar y eliminar reservaciones

### Mockeando consumidores de clases (o ¿clases consumidoras?, no se cual es la forma correcta de traducir "consumer classes")
Por ejemplo, `new DataBase<Account>();` en nuestra clase `UserCredentialsDataAccess` sería un consumidor de clase, la clase `DataBase` no es inyectada en la clase `UserCredentialsDataAccess` sino que se crea directamente cuando se crea la clase `UserCredentialsDataAccess`. Esto plantea algunos retos importantes en materia de pruebas

### Conclusiones
- Ventajas del enfoque de uso intensivo de mocks
  - Podemos probar de forma aisalada todas las clases y métodos
  - Impone un stricto estilo de código
    - Ejemplo: muchas dependencias hacen a la clase dfícil de probar
  - Una vez creados los tests, es fácil crear nuevos
- Desventajas del enfoque de uso intensivo de mocks
  - Los tests y las implementaciones estan estrechamente acoplados
    - Pequeños cambios en implementaciones dará lugar a muchos cambios en nuestros tests. Las refactorizaciones serán un poco más difíciles
  - Son más difíciles de escribir
    - En Js/Ts no tenemos una librería que genere automaticamente mocks

## Pruebas con pocos mocks (Low mock tests)
- Mockearemos lo menos posible
- Crearemos algunos objetos de envoltura que irán alrededor de las solicitudes y las respuestas
- Lo único que mockearemos serán las llamadas a base de datos
- Pudimos comprobar con el informe de covertura de código que con un solo test tocamos más de una clase, y que este test fue a través de toda nuestra base de código. Esto significa que son más complejos y nos dan una mejor visión del funcionamiento de todo nuestro código.
- Finalmente comprobamos que escribimos muchos menos tests, al principio tomo tiempo las configuraciones pero luego de que tenemos los wrappers fue más rápido escribir tests

### Conclusiones
- Ventajas
  - Podemos probar más con menos código
  - Fácil escribir y leer cada test
  - Fácil de mantener
- Desventajas
  - Difícil cubrir casos extremos
    - Nosotros no nos enfretamos a ello, pero en proyectos más complejos, algunos casos extremos realmente necesitan mucha más configuración y mucho más mocking, con este enfoque, intentar alcanzar el 100% de covertura, cubrir todos los casos de uso y los casos extremos es muy complicado
  - Difícil configurar algunos casos
    - En el cuso vimos un caso ideal, nuestra base de datos la teníamos en memoria
    - En lugar de mockear la base de datos, podemos tener un contenedor Docker
    - Otros servicios puede que tenga que ser dockerizado
    - Desde el punto de vista CI/CD, es requerida mucha más configuración

## Pruebas de integración (integration tests)
- Se prueban multiples componentes juntos, comprobamos como interactúan entre sí
  - En clases anteriores consideramos una ruta como una unidad
- La diferencia clave es que par alas pruebas de integración queremos evitar en la medida de lo posible hacer mocks
- Aún serán moqueados los componentes:
  - DataBase
  - Server
- Cuando realizamos pruebas deintegración, queremos probar el sistema lo más cerca posible del despliegue real
- Si queremos acercarnos lo más posible al despliegue real, podemos:
  - Probar contra una etapa de prueba
  - Tener un despliegue especial hecho solo para propósitos de prueba
  - Estos podemos ejecutarlos tanto local como de forma remota
- Como testearemos nuestro sistema:
  - Lanzar la aplicación
  - Usar como un usuario normal
  - Hacer aserciones basados en los recursos

## Otros temas de testing
- Manejo de variables de entorno
- Manejo de múltiples configuraciones de pruebas
- Snapshot testing
  - Para probar objetos grandes
  - Para probar componentes UI, lógica generada o las configuraciones JSON generadas
  - En nuestro caso usamos el comando `npm run itest -- -u` para actualizar el snapshot
- Matchers personalizados
- Runner de pruebas nativo de NodeJs
  - Cambiar a rama `node-test-runner-trials` en `repo-original/TSTestCourse`

### Comparación de framworks de testing
https://npmtrends.com/jasmine-vs-jest-vs-mocha-vs-vitest
- Jest:
  - Corre tests, tiene mock y assert (tiene todo)
- Mocha:
  - Solo corre tests
  - Si queremos mocks complejos usaremos SinonJs
  - Si queremos asserts usaremos Chai
- Ventajas de Jest:
  - Una sola librería
  - Fácil integración con TypeScript
  - Popular (mejor soporte)
  - Funcionalidades para pruebas de UI (React)
- Ventajas de Mocha
  - Funcionalidades más complejas
  - Podemos definir en una sola línea el comportamiento de nuestros mocks
    - `when(certainCall).thenReturn(certainResult)`

## CI/CD con GitHub actions and Docker
- Lo más frecuente es que los tests corran automáticamente en pipelines CI/CD
- A lo largo del curso tuvimos un problema sin resolver: tests de bases de datos
  - Veremos cómo podemos probar las operaciones de bases de datos con Docker
- En esta sección haremos:
  - Configurar GitHub actions
  - Crear e integrar pull requests
  - Tests de operaciones de bases de datos localmente con Docker
  - Tests de operaciones de bases de datos en un pipeline con Docker y GitHub actions

### ¿Qué es CI/CD?
- Continuous Integration / Continuos Delivery (Integración Continua / Entrega Continua)
- Es un método para entregar aplicaciones a los consumidores con frecuencia mediante la introducción de la automatización en las etapas de desarrollo de la aplicación
- Repo en https://github.com/BraianMG/testing-cicd-github-actions-docker

### Acceder a una base de datos para pruebas
- Las bases de datos estan seguras y son de difícil acceso (detras de una VPN)
  - La configuración de conexión para acceder a ellas son muy difíciles y seguras, cómo debe ser
- ¿Cómo podemos probar nuestras operaciones de base de datos?
  - Podemos utilizar una simple base de datos local
    - Opción complicada: configurar una implementación real de la base de datos, según la versión podría ser muy fácil o muy complicado
    - Opción simple: utilizar Docker para tener una versión de una base de datos que pueda ser muy fácil de iniciar una vez que se configura dentro de un comando o un archivo de Docker. Tambien funcionan con CI/CD