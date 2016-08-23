# Seguimiento de pedidos de Chile Express

Módulo npm para hacer el seguimiento de uno o más pedidos de Chile Express.

##Instalación

```
$ npm install chileexpress --save
```

##Uso

```javascript
var chileexpress = require('chileexpress');

chileexpress(['600110073533']).then(r=>{
	console.log(r);
}).catch(e => {
	console.log(e);
})
```


**Función principal:** Recibe un arreglo de códigos de seguimiento y retorna una promesa con un arreglo con la información para cada código de seguimiento

**Params**

- Códigos de seguimiento `Array<String>`

**Returns**: 

- Resultados `Promise<Array<result>>`

**Ejemplo de result:**

```javascript
  {
    "info": {
      "orden_de_transporte ": "600110073533",
      "producto ": "Encomienda",
      "servicio ": "Dia Habil Siguiente",
      "estado ": "Pieza en ruta al  DESTINATARIO"
    },
    "entrega": {
      "rut_receptor": "14111532-4",
      "fecha_entrega": "30/07/2015",
      "hora_entrega": "11:24",
      "nombre_receptor": "ALEXIS ADASME"
    },
    "hitos": [
      {
        "fecha": "30/07/2015",
        "hora": "11:24",
        "actividad": "Pieza en ruta al  DESTINATARIO"
      },
      {
        "fecha": "29/07/2015",
        "hora": "08:42",
        "actividad": "Pieza en tránsito al destino ANTOFAGASTA BAQUEDANO"
      },
      {
        "fecha": "28/07/2015",
        "hora": "18:33",
        "actividad": "Pieza en tránsito al destino CENTRO DE DISTRIBUCIÓN SANTIAGO"
      },
      {
        "fecha": "28/07/2015",
        "hora": "17:35",
        "actividad": "Pieza recibida en Chilexpress"
      }
    ]
  }

```

##Consideraciones
La cantidad de códigos de seguimiento ingresados no se controla por el programa. Puede que si se abusa de la consulta Chile Express controle su uso. Usar con discreción.


