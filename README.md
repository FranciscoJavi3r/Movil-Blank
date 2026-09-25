# Movil-Blank

Aplicación móvil de práctica hecha con **React Native** y **Expo**. Tiene varias pantallas conectadas con **React Navigation** mediante una barra de pestañas inferior (*bottom tabs*).

## Pantallas

| Pantalla | Archivo | Qué hace |
| --- | --- | --- |
| Inicio | `components/InicioScreen.js` | Pantalla inicial con botones que llevan a las demás pantallas. |
| Detalle | `components/DetalleScreen.js` | Pantalla sencilla con un botón para regresar. |
| Formulario | `components/Formulario.js` | Tarjeta de perfil con campos de correo y teléfono. |
| Licencia | `components/LicenciaScreen.js` | Muestra una licencia de conducir dentro de una tarjeta. |
| Tareas | `components/TareasScreen.js` | Lista, crea, marca como completada, edita y borra tareas usando **TareasAPI**. |

### Pantalla de Tareas (conectada a la API)

Consume la API de la carpeta `TareasAPI` (.NET 10, `http://localhost:5134`). Toda la comunicación está en `services/tareasApi.js`; la pantalla solo llama a sus funciones (`obtenerTareas`, `crearTarea`, `actualizarTarea`, `eliminarTarea`).

Para usarla, primero enciende la API y luego la app (en dos terminales):

```bash
# Terminal 1: la API
cd ../TareasAPI
dotnet run

# Terminal 2: la app
npm start        # y presiona "w" para abrirla en el navegador
```

La dirección de la API se puede cambiar creando un archivo `.env` en esta carpeta:

```
EXPO_PUBLIC_API_URL=http://192.168.1.50:5134
```

| Dónde corre la app | Dirección de la API |
| --- | --- |
| Navegador (`w`) o simulador de iOS | `http://localhost:5134` (por defecto) |
| Emulador de Android | `http://10.0.2.2:5134` (por defecto en Android) |
| Teléfono físico con Expo Go | `http://<IP de tu PC>:5134`; además la API debe escuchar en `0.0.0.0` y el firewall permitir el puerto 5134 |

En el navegador la API necesita **CORS**; ya está habilitado en `TareasAPI/Program.cs` para `localhost:8081` y `localhost:19006`.

### Pantalla de Licencia de Conducir

Resuelve la actividad descrita en [`ACTIVITY.md`](ACTIVITY.md):

- Los datos de la licencia se guardan en un `useState` (nombre, número, fechas, tipo, dirección, estado y foto).
- Usa el componente **`InfoFila`**, declarado fuera del componente principal, para mostrar cada dato como una fila `etiqueta ... valor`:

  ```jsx
  <InfoFila etiqueta="No. de Licencia" valor={licencia.numeroLicencia} />
  ```

- Está registrada en `App.js` con el nombre `Licencia`. Se abre desde su pestaña en la barra inferior o con el botón **"Ir a Licencia"** de la pantalla de inicio.

## Navegación

La app usa `createBottomTabNavigator` de `@react-navigation/bottom-tabs`. Cada pantalla es una pestaña con su ícono de [Ionicons](https://icons.expo.fyi) (`@expo/vector-icons`):

| Pestaña | Ícono |
| --- | --- |
| Inicio | `home` |
| Detalle | `information-circle` |
| Formulario | `create` |
| Licencia | `card` |

Los íconos se ven rellenos cuando la pestaña está seleccionada y solo con contorno (`-outline`) cuando no lo está. Con `backBehavior="history"`, `navigation.goBack()` regresa a la pestaña visitada antes.

## Componentes reutilizables

- `components/Lista.js`: recibe un arreglo (`list`) y muestra cada elemento.
- `components/TextInput.js`: caja de texto que muestra lo que el usuario va escribiendo.

## Estructura del proyecto

```
Movil-Blank/
├── index.js          # Punto de entrada: registra App como componente raíz
├── App.js            # Configura la barra de pestañas y registra las pantallas
├── app.json          # Configuración de Expo (nombre, íconos, etc.)
├── components/       # Pantallas y componentes de la app
└── assets/           # Íconos e imágenes
```

## Requisitos

- [Node.js](https://nodejs.org/) (versión LTS)
- La app **Expo Go** en tu teléfono, o un emulador de Android / simulador de iOS

## Cómo ejecutarla

```bash
# 1. Instalar las dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm start
```

Después escanea el código QR con Expo Go, o usa uno de estos comandos:

```bash
npm run android   # abrir en Android
npm run ios       # abrir en iOS
npm run web       # abrir en el navegador
```

## Tecnologías

- Expo SDK 57
- React Native 0.86 / React 19
- React Navigation 7 (`@react-navigation/native` y `@react-navigation/bottom-tabs`)
- `@expo/vector-icons` (íconos de las pestañas)

## Licencia

Consulta el archivo [`LICENSE`](LICENSE).
