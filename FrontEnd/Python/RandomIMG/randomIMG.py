import random
import os
import subprocess

# Directorio con las imágenes
path = r'D:\Codes\RandomIMG\GFoto'  # mejor como raw string

# Lista de extensiones de imágenes válidas
extensionesValidas = ['.jpg', '.jpeg', '.png']

# Archivo donde guardaremos las imágenes ya usadas en este ciclo
archivo_usadas = os.path.join(path, 'usadas.txt')


def obtener_imagenes_validas(path, extensiones):
    """Devuelve una lista de archivos de imagen válidos en la carpeta."""
    archivos = os.listdir(path)
    imagenes = [
        f for f in archivos
        if any(f.lower().endswith(ext) for ext in extensiones)
    ]
    return imagenes


def leer_usadas(archivo):
    """Lee el archivo de usadas y devuelve un set de nombres de archivo."""
    if not os.path.exists(archivo):
        return set()
    with open(archivo, 'r', encoding='utf-8') as f:
        usadas = {line.strip() for line in f if line.strip()}
    return usadas


def escribir_usadas(archivo, usadas):
    """Escribe el set de usadas en el archivo."""
    with open(archivo, 'w', encoding='utf-8') as f:
        for img in usadas:
            f.write(img + '\n')


# 1. Obtener todas las imágenes válidas
todas_las_imagenes = obtener_imagenes_validas(path, extensionesValidas)

if not todas_las_imagenes:
    print("No se encontraron imágenes en el directorio especificado.")
else:
    # 2. Leer cuáles ya se usaron
    usadas = leer_usadas(archivo_usadas)

    # Filtrar usadas que ya no existan (por si borraste alguna imagen)
    usadas = {img for img in usadas if img in todas_las_imagenes}

    # 3. Calcular cuáles están disponibles (no usadas todavía en este ciclo)
    disponibles = [img for img in todas_las_imagenes if img not in usadas]

    # 4. Si no hay disponibles, reiniciamos el ciclo
    if not disponibles:
        print("Se han mostrado todas las imágenes. Reiniciando ciclo...")
        usadas = set()
        disponibles = todas_las_imagenes.copy()

    # 5. Elegir una imagen al azar de las disponibles
    imagenSeleccionada = random.choice(disponibles)
    print(f"Imagen seleccionada: {imagenSeleccionada}")

    # 6. Marcarla como usada y guardar
    usadas.add(imagenSeleccionada)
    escribir_usadas(archivo_usadas, usadas)

    # 7. Construir la ruta completa a la imagen
    rutaImagen = os.path.join(path, imagenSeleccionada)

    # 8. Abrir la imagen con el visualizador predeterminado del sistema
    if os.name == 'nt':  # Windows
        os.startfile(rutaImagen)
    elif os.name == 'posix':  # MacOS o Linux
        subprocess.call(('xdg-open', rutaImagen))
