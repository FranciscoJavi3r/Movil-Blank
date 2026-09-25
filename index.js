// ------------------------------------------------------------
// index.js: el punto de entrada de la app (el primer archivo que se ejecuta).
// Su único trabajo es decirle a Expo cuál es el componente principal.
// ------------------------------------------------------------
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent registra "App" como el componente raíz.
// Funciona igual si abres la app en Expo Go o en una compilación nativa.
registerRootComponent(App);
