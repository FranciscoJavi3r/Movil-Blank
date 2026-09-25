// ------------------------------------------------------------
// App.js: el componente raíz de la aplicación.
// Aquí se configura la NAVEGACIÓN, es decir, qué pantallas existen
// y cómo se llaman para poder movernos entre ellas.
// ------------------------------------------------------------

// NavigationContainer: "envuelve" toda la app y guarda en qué pantalla estamos.
import { NavigationContainer } from "@react-navigation/native";
// createBottomTabNavigator: crea una barra de pestañas (tabs) en la parte
// de abajo de la pantalla. Cada pestaña abre una pantalla distinta.
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Ionicons: una colección de íconos que viene con Expo.
// Lista de íconos disponibles: https://icons.expo.fyi
import { Ionicons } from "@expo/vector-icons";

// Importamos las pantallas que creamos en la carpeta components.
import InicioScreen from "./components/InicioScreen";
import DetalleScreen from "./components/DetalleScreen";
import Formulario from "./components/Formulario";
import LicenciaScreen from "./components/LicenciaScreen";
import TareasScreen from "./components/TareasScreen";

// Creamos el objeto Tab, que nos da <Tab.Navigator> y <Tab.Screen>.
const Tab = createBottomTabNavigator();

// Ícono que usa cada pestaña. La clave es el "name" de la pestaña.
// Hay dos versiones de cada ícono: relleno (cuando la pestaña está
// seleccionada) y solo contorno "-outline" (cuando no lo está).
const iconos = {
  Inicio: "home",
  Detalle: "information-circle",
  Formulario: "create",
  Licencia: "card",
  Tareas: "checkbox",
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        // initialRouteName indica la primera pestaña que se muestra al abrir la app.
        initialRouteName="Inicio"
        // backBehavior="history": al usar navigation.goBack() se regresa
        // a la pestaña que se visitó antes (como el botón "atrás" del navegador).
        backBehavior="history"
        // screenOptions aplica las mismas opciones a TODAS las pestañas.
        // Recibe "route" para saber de qué pestaña se trata.
        screenOptions={({ route }) => ({
          // tabBarIcon dibuja el ícono de la pestaña.
          // - focused: true si la pestaña está seleccionada.
          // - color y size: los da la librería según el estado de la pestaña.
          tabBarIcon: ({ focused, color, size }) => {
            const nombreIcono = focused
              ? iconos[route.name]
              : `${iconos[route.name]}-outline`;
            return <Ionicons name={nombreIcono} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#0077b6", // color de la pestaña seleccionada
          tabBarInactiveTintColor: "gray", // color de las demás pestañas
        })}
      >
        {/* Cada Tab.Screen registra una pestaña:
            - name: el nombre que usamos para navegar, ej. navigation.navigate("Licencia")
            - component: el componente que se dibuja en esa pestaña */}
        <Tab.Screen name="Inicio" component={InicioScreen} />
        <Tab.Screen name="Detalle" component={DetalleScreen} />
        <Tab.Screen name="Formulario" component={Formulario} />
        {/* options={{ title }} cambia el texto de la barra de arriba y de la pestaña */}
        <Tab.Screen
          name="Licencia"
          component={LicenciaScreen}
          options={{ title: "Licencia" }}
        />
        {/* Pantalla que consume TareasAPI (lista, crea, edita y borra tareas). */}
        <Tab.Screen name="Tareas" component={TareasScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
