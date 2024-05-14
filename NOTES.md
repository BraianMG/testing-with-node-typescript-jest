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

## Métodos de Jest
toBe() --> para valores primitivos
toEqual() --> para objetos
toBeTruthy() --> para comprobar si está o no definido un objeto cuando no estamos seguros de la estructura que recibimos