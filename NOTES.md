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