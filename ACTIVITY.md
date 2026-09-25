# Actividad: Pantalla de Licencia de Conducir

Actividad: realizar una pantalla para mostrar una licencia de conducir, se presenta a continuación el diseño esperado, sin embargo puede haber variaciones en el diseño pero la licencia debe contar con **TODOS los campos mostrados** y utilizar el componente `InfoFila`. También se debe agregar al menú de navegación.

## 1. Datos de la licencia

Los compos/información se manejan en un `useState []` que se muestra a continuación:

```jsx
const [licencia, setLicencia] = useState({
   nombre: 'Bob Esponja Pantalones Cuadrados',
   numeroLicencia: 'FQ-000112',
   fechaNacimiento: '14/07/1986',
   fechaVencimiento: '14/07/2030',
   tipoLicencia: 'Clase B',
   direccion: 'Piña 124, Fondo de Bikini',
   estado: 'Activa',
   foto: 'https://placekitten.com/150/150', // luego será la foto real de la API
 });
```

## 2. Componente externo InfoFila (OBLIGATORIO)

Se debe utilizar el siguiente componente externo. Este componente se declara fuera del componente normal (es como si fuera una función global) puede ir entre el stylesheets y el componente normal. **OBLIGATORIO**

```jsx
function InfoFila({ etiqueta, valor }) {
 return (
   <View style={styles.fila}>
     <Text style={styles.etiqueta}>{  }</Text>
     <Text style={styles.valor}>{  }</Text>
   </View>
 );
}
```

## 3. Integración del componente InfoFila (OBLIGATORIO)

Para integrarlo se hace de la siguiente manera en el componente normal (recuerda que etiqueta y valor son props o parámetros que le enviamos a esa funcion/componente **OBLIGATORIO**:

```jsx
<InfoFila etiqueta="No. de Licencia" valor={  } />
<InfoFila etiqueta="Fecha de Nacimiento" valor={  } />
<InfoFila etiqueta="Fecha de Vencimiento" valor={  } />
<InfoFila etiqueta="Tipo" valor={  } />
<InfoFila etiqueta="Dirección" valor={  } />
```

## 4. Stylesheet

A continuación se muestra el Stylesheet utilizado en el ejemplo mostrado en caso de que lo quieran hacer igual.

```jsx
const styles = StyleSheet.create({
 pantalla: { flex: 1, backgroundColor: '#e6f7ff' },
 contenedor: { padding: 20 },
 card: {
   backgroundColor: '#fff',
   borderRadius: 16,
   padding: 20,
   elevation: 4,
   shadowColor: '#000',
   shadowOpacity: 0.15,
   shadowRadius: 6,
 },
 encabezado: { alignItems: 'center', marginBottom: 16 },
 tituloEncabezado: { fontSize: 12, letterSpacing: 2, color: '#0077b6', fontWeight: '700' },
 subtituloEncabezado: { fontSize: 18, fontWeight: 'bold', color: '#023e8a' },
 filaPrincipal: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
 foto: { width: 90, height: 90, borderRadius: 12, marginRight: 16, borderWidth: 2, borderColor: '#0077b6' },
 datosPrincipales: { flex: 1 },
 nombre: { fontSize: 18, fontWeight: 'bold', color: '#03045e', marginBottom: 6 },
 badge: {
   backgroundColor: '#b7e4c7',
   alignSelf: 'flex-start',
   paddingHorizontal: 10,
   paddingVertical: 4,
   borderRadius: 20,
 },
 badgeTexto: { color: '#2d6a4f', fontSize: 12, fontWeight: '600' },
 linea: { height: 1, backgroundColor: '#ddd', marginVertical: 10 },
 fila: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
 etiqueta: { fontSize: 13, color: '#666' },
 valor: { fontSize: 13, fontWeight: '600', color: '#333', flexShrink: 1, textAlign: 'right' },
});
```
