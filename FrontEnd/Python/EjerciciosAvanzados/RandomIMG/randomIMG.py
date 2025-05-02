import random
import os
import subprocess

# Directorio con las imágenes
path = './GFoto'

# Lista para almacenar las imágenes
listaImagenes = []

# Lista de extensiones de imágenes válidas
extensionesValidas = ['.jpg', '.jpeg', '.png']

# Obtener la lista de archivos en el directorio
lista = os.listdir(path)


# Filtrar las imágenes que terminen en las extensiones válidas y agregarlas a la lista de imágenes
def randomImagen(lista, extensiones):
    for i in lista:
        if any(i.lower().endswith(ext) for ext in extensiones):
            listaImagenes.append(i)
    return random.choice(listaImagenes) if listaImagenes else None


# Obtener una imagen al azar
imagenSeleccionada = randomImagen(lista, extensionesValidas)

# Comprobar si se seleccionó una imagen
if imagenSeleccionada:
    print(f"Imagen seleccionada: {imagenSeleccionada}")

    # Construir la ruta completa a la imagen
    rutaImagen = os.path.join(path, imagenSeleccionada)

    # Abrir la imagen con el visualizador predeterminado del sistema
    if os.name == 'nt':  # Windows
        os.startfile(rutaImagen)
    elif os.name == 'posix':  # MacOS o Linux
        subprocess.call(('xdg-open', rutaImagen))
else:
    print("No se encontraron imágenes en el directorio especificado.")
