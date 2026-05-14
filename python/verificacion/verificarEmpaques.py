import pandas as pd
import requests
from PIL import Image
import pytesseract
from io import BytesIO
import os
import sys

# --- CONFIGURACIÓN DE TESSERACT OCR ---
# 1. Si ya lo instalaste, busca dónde está 'tesseract.exe' y pon la ruta aquí:
# Ejemplo: r'C:\Program Files\Tesseract-OCR\tesseract.exe'
RUTA_PERSONALIZADA = r'' 

def configurar_tesseract():
    """Busca el ejecutable de Tesseract en rutas comunes de Windows."""
    if RUTA_PERSONALIZADA and os.path.exists(RUTA_PERSONALIZADA):
        pytesseract.pytesseract.tesseract_cmd = RUTA_PERSONALIZADA
        return True

    # Lista de rutas probables en Windows
    user_name = os.getlogin()
    posibles_rutas = [
        r'C:\Program Files\Tesseract-OCR\tesseract.exe',
        r'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe',
        fr'C:\Users\{user_name}\AppData\Local\Tesseract-OCR\tesseract.exe',
        fr'C:\Users\{user_name}\AppData\Local\Programs\Tesseract-OCR\tesseract.exe',
        r'C:\bin\tesseract\tesseract.exe'
    ]

    for ruta in posibles_rutas:
        if os.path.exists(ruta):
            pytesseract.pytesseract.tesseract_cmd = ruta
            return True
    
    return False

def validar_registros(archivo_csv):
    if not os.path.exists(archivo_csv):
        print(f"Error: No se encuentra el archivo '{archivo_csv}'")
        return

    if not configurar_tesseract():
        print("\n" + "="*60)
        print("ERROR: NO SE ENCONTRÓ TESSERACT OCR")
        print("="*60)
        print("Para que este script funcione, debes instalar Tesseract en Windows:")
        print("1. Descarga el instalador: https://github.com/UB-Mannheim/tesseract/wiki")
        print("2. Instálalo (recuerda la carpeta de instalación).")
        print("3. Si el error persiste, abre este script y pega la ruta en 'RUTA_PERSONALIZADA'.")
        print("="*60 + "\n")
        return

    print("Configuración exitosa. Leyendo datos...")
    df = pd.read_csv(archivo_csv)
    total = len(df)
    resultados = []

    print(f"Iniciando validación de {total} registros...")

    for index, row in df.iterrows():
        url_imagen = row['imagen de empaque']
        codigo_esperado = str(row['codigo']).strip()
        
        # Mostrar progreso real
        sys.stdout.write(f"\rProcesando {index + 1}/{total} - Código: {codigo_esperado}...")
        sys.stdout.flush()
        
        try:
            # 1. Descargar imagen
            response = requests.get(url_imagen, timeout=10)
            img = Image.open(BytesIO(response.content))
            
            # 2. Extraer texto (OCR)
            # Convertimos a escala de grises y aumentamos contraste para mejorar lectura
            texto_extraido = pytesseract.image_to_string(img.convert('L'))
            
            # 3. Validar (Búsqueda insensible a mayúsculas)
            if codigo_esperado.lower() in texto_extraido.lower():
                veredicto = "Validado"
            else:
                veredicto = "No encontrado en imagen"
                
        except Exception as e:
            veredicto = f"Error: {str(e)}"
        
        resultados.append(veredicto)
    
    print("\n\nGuardando resultados en 'Validacion_Automatizada.csv'...")
    df['Resultado_IA'] = resultados
    df.to_csv('Validacion_Automatizada.csv', index=False)
    print("¡Proceso completado!")

if __name__ == "__main__":
    validar_registros('VerificarEmpaques.csv')