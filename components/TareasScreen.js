// ------------------------------------------------------------
// PANTALLA DE TAREAS
// Muestra la lista de tareas de TareasAPI y permite crear, marcar como
// completada, editar y borrar (CRUD).
// ------------------------------------------------------------
import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} from "../services/tareasApi";

const MAX_TITULO = 100; // la API rechaza títulos más largos

// Pide confirmación antes de borrar. En web Alert.alert no muestra botones,
// por eso allí se usa window.confirm.
function confirmarBorrado(titulo, alConfirmar) {
  const mensaje = `¿Borrar la tarea "${titulo}"?`;
  if (Platform.OS === "web") {
    if (window.confirm(mensaje)) alConfirmar();
    return;
  }
  Alert.alert("Borrar tarea", mensaje, [
    { text: "Cancelar", style: "cancel" },
    { text: "Borrar", style: "destructive", onPress: alConfirmar },
  ]);
}

// Una fila de la lista: check, textos y botones de editar / borrar.
function TareaItem({ tarea, onAlternar, onEditar, onBorrar }) {
  return (
    <View style={styles.tarjeta}>
      <Pressable onPress={() => onAlternar(tarea)} hitSlop={8}>
        <Ionicons
          name={tarea.completada ? "checkmark-circle" : "ellipse-outline"}
          size={28}
          color={tarea.completada ? "#2d6a4f" : "#0077b6"}
        />
      </Pressable>
      <View style={styles.textos}>
        <Text style={[styles.titulo, tarea.completada && styles.tachado]}>
          {tarea.titulo}
        </Text>
        {!!tarea.descripcion && (
          <Text style={styles.descripcion}>{tarea.descripcion}</Text>
        )}
      </View>
      <Pressable onPress={() => onEditar(tarea)} hitSlop={8}>
        <Ionicons name="create-outline" size={22} color="#0077b6" />
      </Pressable>
      <Pressable onPress={() => onBorrar(tarea)} hitSlop={8}>
        <Ionicons name="trash-outline" size={22} color="#c1121f" />
      </Pressable>
    </View>
  );
}

export default function TareasScreen() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);
  const [error, setError] = useState(null); // error al cargar la lista
  const [mensajeForm, setMensajeForm] = useState(null); // error del formulario
  const [guardando, setGuardando] = useState(false);

  // Campos del formulario. editandoId es null cuando se está creando.
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const cargar = useCallback(async (esRefresco = false) => {
    esRefresco ? setRefrescando(true) : setCargando(true);
    try {
      setTareas(await obtenerTareas());
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  }, []);

  // Se ejecuta una vez al abrir la pantalla.
  useEffect(() => {
    cargar();
  }, [cargar]);

  const limpiarFormulario = () => {
    setTitulo("");
    setDescripcion("");
    setEditandoId(null);
    setMensajeForm(null);
  };

  const guardar = async () => {
    const tituloLimpio = titulo.trim();
    if (!tituloLimpio) return setMensajeForm("El título es obligatorio");
    if (tituloLimpio.length > MAX_TITULO)
      return setMensajeForm(`El título no puede superar ${MAX_TITULO} caracteres`);

    setGuardando(true);
    setMensajeForm(null);
    try {
      if (editandoId === null) {
        const nueva = await crearTarea({
          titulo: tituloLimpio,
          descripcion: descripcion.trim(),
          completada: false,
        });
        setTareas((actuales) => [...actuales, nueva]);
      } else {
        const original = tareas.find((t) => t.id === editandoId);
        const editada = {
          ...original,
          titulo: tituloLimpio,
          descripcion: descripcion.trim(),
        };
        await actualizarTarea(editandoId, editada);
        setTareas((actuales) =>
          actuales.map((t) => (t.id === editandoId ? editada : t))
        );
      }
      limpiarFormulario();
    } catch (e) {
      setMensajeForm(e.message);
    } finally {
      setGuardando(false);
    }
  };

  const alternar = async (tarea) => {
    const actualizada = { ...tarea, completada: !tarea.completada };
    try {
      await actualizarTarea(tarea.id, actualizada);
      setTareas((actuales) =>
        actuales.map((t) => (t.id === tarea.id ? actualizada : t))
      );
    } catch (e) {
      setMensajeForm(e.message);
    }
  };

  const empezarEdicion = (tarea) => {
    setEditandoId(tarea.id);
    setTitulo(tarea.titulo);
    setDescripcion(tarea.descripcion);
    setMensajeForm(null);
  };

  const borrar = (tarea) =>
    confirmarBorrado(tarea.titulo, async () => {
      try {
        await eliminarTarea(tarea.id);
        setTareas((actuales) => actuales.filter((t) => t.id !== tarea.id));
        if (editandoId === tarea.id) limpiarFormulario();
      } catch (e) {
        setMensajeForm(e.message);
      }
    });

  // Formulario que se muestra arriba de la lista.
  const formulario = (
    <View style={styles.formulario}>
      <Text style={styles.tituloFormulario}>
        {editandoId === null ? "Nueva tarea" : "Editar tarea"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        maxLength={MAX_TITULO}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      {!!mensajeForm && <Text style={styles.mensajeError}>{mensajeForm}</Text>}
      <View style={styles.botones}>
        <Pressable
          style={[styles.boton, guardando && styles.botonDeshabilitado]}
          onPress={guardar}
          disabled={guardando}
        >
          <Text style={styles.botonTexto}>
            {editandoId === null ? "Agregar" : "Guardar cambios"}
          </Text>
        </Pressable>
        {editandoId !== null && (
          <Pressable style={styles.botonSecundario} onPress={limpiarFormulario}>
            <Text style={styles.botonSecundarioTexto}>Cancelar</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  if (cargando) {
    return (
      <View style={[styles.pantalla, styles.centrado]}>
        <ActivityIndicator size="large" color="#0077b6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.pantalla, styles.centrado]}>
        <Text style={styles.mensajeError}>{error}</Text>
        <Pressable style={styles.boton} onPress={() => cargar()}>
          <Text style={styles.botonTexto}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.pantalla}
      contentContainerStyle={styles.contenedor}
      data={tareas}
      keyExtractor={(t) => String(t.id)}
      refreshing={refrescando}
      onRefresh={() => cargar(true)}
      ListHeaderComponent={formulario}
      ListEmptyComponent={
        <Text style={styles.vacio}>Todavía no hay tareas. ¡Agrega la primera!</Text>
      }
      renderItem={({ item }) => (
        <TareaItem
          tarea={item}
          onAlternar={alternar}
          onEditar={empezarEdicion}
          onBorrar={borrar}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: "#e6f7ff" },
  centrado: { alignItems: "center", justifyContent: "center", padding: 20 },
  contenedor: { padding: 20 },
  formulario: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  tituloFormulario: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#023e8a",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 10,
    fontSize: 14,
  },
  botones: { flexDirection: "row", gap: 10 },
  boton: {
    backgroundColor: "#0077b6",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  botonDeshabilitado: { opacity: 0.6 },
  botonTexto: { color: "#fff", fontWeight: "600" },
  botonSecundario: {
    borderWidth: 1,
    borderColor: "#0077b6",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  botonSecundarioTexto: { color: "#0077b6", fontWeight: "600" },
  mensajeError: { color: "#c1121f", marginBottom: 10, textAlign: "center" },
  tarjeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textos: { flex: 1 },
  titulo: { fontSize: 15, fontWeight: "600", color: "#03045e" },
  tachado: { textDecorationLine: "line-through", color: "#888" },
  descripcion: { fontSize: 13, color: "#666", marginTop: 2 },
  vacio: { textAlign: "center", color: "#666", marginTop: 20 },
});
