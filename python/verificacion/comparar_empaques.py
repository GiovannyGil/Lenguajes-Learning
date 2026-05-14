import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
archivo_excel = os.path.join(BASE_DIR, 'Empaquesnovalidados.xlsx')
archivo_csv = os.path.join(BASE_DIR, 'empaquesInvalidos.csv')
archivo_salida = os.path.join(BASE_DIR, 'empaques_faltantes.csv')

def comparar():
    print("🚀 Iniciando comparación corregida...")
    
    if not os.path.exists(archivo_excel) or not os.path.exists(archivo_csv):
        print("❌ Error: Asegúrate de que los archivos estén en la carpeta.")
        return

    try:
        # 1. Leer Excel
        df_excel = pd.read_excel(archivo_excel)
        
        # 2. Leer CSV con separador de punto y coma
        df_csv = pd.read_csv(archivo_csv, sep=';', quotechar='"')
        
        # 3. Detectar columnas de códigos
        # En el CSV ya vimos que se llama 'codigo'
        col_csv = 'codigo' if 'codigo' in df_csv.columns else df_csv.columns[3]
        
        # En el Excel buscaremos 'codigo' o similar
        columnas_posibles = ['codigo', 'codigo_promocional', 'empaque', 'CODIGO']
        col_excel = next((c for c in columnas_posibles if c in df_excel.columns), df_excel.columns[0])
        
        print(f"📊 Usando columnas: Excel['{col_excel}'] vs CSV['{col_csv}']")

        # 4. Limpiar y Normalizar (Pasar a MAYÚSCULAS y quitar espacios)
        # Esto es vital para que coincidan 'a1' con 'A1'
        codes_excel = df_excel[col_excel].astype(str).str.strip().str.upper()
        codes_csv = df_csv[col_csv].astype(str).str.strip().str.upper()

        set_excel = set(codes_excel)
        set_csv = set(codes_csv)

        # 5. Comparar
        faltantes_codigos = set_excel - set_csv
        
        print("-" * 30)
        print(f"✅ Procesados en Excel: {len(set_excel)}")
        print(f"✅ Procesados en CSV: {len(set_csv)}")
        print(f"⚠️  REALMENTE FALTAN: {len(faltantes_codigos)}")
        print("-" * 30)

        if len(faltantes_codigos) > 0:
            # Filtrar el DataFrame original para guardar los faltantes
            # Usamos la versión normalizada para filtrar
            mask = codes_excel.isin(faltantes_codigos)
            df_resultado = df_excel[mask]
            
            df_resultado.to_csv(archivo_salida, index=False, sep=';')
            print(f"💾 Guardados en: {archivo_salida}")
            
            print("\nPrimeros faltantes encontrados:")
            for c in list(faltantes_codigos)[:10]:
                print(f" - {c}")
        else:
            print("✨ ¡Excelente! No falta ningún código del Excel en el CSV.")

    except Exception as e:
        print(f"❌ Error durante el proceso: {e}")

if __name__ == "__main__":
    comparar()
