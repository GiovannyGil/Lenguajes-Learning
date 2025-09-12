import random
import os
import subprocess
import time

# Directorio con las imágenes
path = './GFoto'

# Archivo para guardar imágenes ya usadas (persistencia temporal)
historial_file = "imagenes_usadas.txt"

# Extensiones válidas
extensionesValidas = ['.jpg', '.jpeg', '.png']

# Obtener lista de archivos en el directorio
lista = [f for f in os.listdir(path) if any(f.lower().endswith(ext) for ext in extensionesValidas)]

# Cargar historial si existe
imagenes_usadas = set()
if os.path.exists(historial_file):
    with open(historial_file, "r", encoding="utf-8") as f:
        for linea in f:
            partes = linea.strip().split("|")
            if len(partes) == 2:
                nombre, timestamp = partes
                # si quieres resetear cada cierto tiempo (ej: 3 horas)
                if time.time() - float(timestamp) < 3 * 3600:  
                    imagenes_usadas.add(nombre)

# Filtrar imágenes disponibles
imagenes_disponibles = [img for img in lista if img not in imagenes_usadas]

# Si ya no quedan disponibles, resetear historial
if not imagenes_disponibles:
    imagenes_usadas.clear()
    imagenes_disponibles = lista

# Elegir una imagen
imagenSeleccionada = random.choice(imagenes_disponibles)

# Guardar en historial
with open(historial_file, "a", encoding="utf-8") as f:
    f.write(f"{imagenSeleccionada}|{time.time()}\n")

# Mostrar
print(f"Imagen seleccionada: {imagenSeleccionada}")
rutaImagen = os.path.join(path, imagenSeleccionada)

if os.name == 'nt':  # Windows
    os.startfile(rutaImagen)
elif os.name == 'posix':  # MacOS o Linux
    subprocess.call(('xdg-open', rutaImagen))
