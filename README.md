
# Superhéroes

Pequeño proyecto para prueba técnia basado en Angular


## Puesta en marcha
 - Instalar yarn: *npm install --global yarn*
 - Instalar paquetes: *yarn*
 - Arrancar proyecto: *yarn start*



## API
- Se utiliza llamadas a una API de [Beeceptor](https://beeceptor.com/crud-api/), en la que se puede crear un endpoint mediante un token de forma sencilla. CUIDADO PORQUE SOLO DEJA 50 LLAMADAS POR DÍA.
- Si un día se excede en llamdas, sería simplemente crear un nuevo endpoint, cambiar el token y volver a introducir los datos.

## Tabla-Listado
- Listado de los superhéroes existentes en una tabla. Esta tabla cuenta con un par de botones para permitir el cambio de idioma entre Castellano e Inglés, aunque solo se actualiza las cabeceras de la tabla por simplificar.
- Un toggle para mostrar las opciones de editar y eliminar un elemento de la tabla. Si se selecciona editar, se navegará al form con los datos del superhéroe seleccionado. Si se elige borrar, se preguntará en un popup para que confirme
- Un searchbox para filtrar los superhéroes existentes. Con un delay de 1 segundo para evitar llamadas innecesarias (en este caso no se hace llamada a la API, simplemente se filtra el listado existente).
- Botón flotante para navegar al form de crear superhéroes.
- El nombre de los superhéroes se mostrará con la primera letra en mayúscula.
- Cada fila tendrá el color asociado al superhéroe.


## Form
- Formulario con campos de nombre (input en mayusculas), color de ojos (select), fecha de nacimiento (datepicker), género (radio), superpoderes (checkbox) y color (colorpicker).
- Todos los campos son obligatorios
- Cuando se guarde o edite, se navega al listado actualizando la tabla


## Loader
- Existe un delay de 3 segundos cuando se obtiene los superhéroes para mostrar un loader
- Cuando se crea/edita/elimna un superhéroe, se muestra un aviso

