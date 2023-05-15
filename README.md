# Parte 1 Prueba técnica

Este es un microservicio construido con Node.js y Express que permite consultar datos de una API externa pasando como parámetros una fecha y días adicionales a esa fecha. Además, el API realiza una petición separada para cada día adicional y espera a que todas las peticiones terminen antes de devolver la respuesta final.

## Requisitos previos

Antes de poder usar este API, debes tener instalado Node.js en tu sistema. Puedes descargar Node.js desde su sitio web oficial: https://nodejs.org/

## Instalación

Para instalar las dependencias necesarias, abre una terminal en la carpeta raíz del proyecto y ejecuta el siguiente comando:

```
npm install
```

## Uso

Para iniciar el servidor, ejecuta el siguiente comando en una terminal en la carpeta raíz del proyecto:

```
npm start
```

Una vez que el servidor esté en ejecución, puedes realizar consultas al API mediante una URL como la siguiente:

```
http://localhost:3001/resumen/2019-12-01?dias=5
```

En esta URL, `fecha` es la fecha inicial de la consulta en formato `YYYY-MM-DD` y `dias` es el número de días adicionales a partir de la fecha inicial que se deben incluir en la consulta.

La respuesta del API será un arreglo de objetos con los datos solicitados para cada día de la consulta. Por ejemplo:

```
{
    "total": 0,
    "comprasPorTDC": {
        "privada": 0,
        "visa debit": 0,
        "maestro": 0,
        "master plat": 0,
        "visa gold": 0,
        "amex": 0,
        "visa classic": 0,
        "master gold": 0,
        "amex corp": 0,
        "master classic": 0,
        "visa plat": 0
    },
    "nocompraron": 0,
    "compraMasAlta": 0
}
```

## Configuración

Puedes modificar el puerto en el que se ejecuta el servidor cambiando el valor de la constante `port` en el archivo `index.js`.

También puedes modificar la URL de la API externa cambiando el valor de la constante `url` en el archivo `index.js`.

# Parte 2 Prueba técnica

En esta parte de la prueba técnica, se ingresa mediante el navegador a la url http://localhost:3001

```
http://localhost:3001
```

Esto despliega una pantalla la cual contiene un pequeño campo para anexar el archivo csv y al darle en el botón de convertir este se convertirá en un JSON en el recuadro de abajo.