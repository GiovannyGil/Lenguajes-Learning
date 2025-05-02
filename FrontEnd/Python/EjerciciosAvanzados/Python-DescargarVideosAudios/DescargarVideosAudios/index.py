import yt_dlp

def descargar(link, solo_audio=False):
    if solo_audio:
        # Opciones para descargar solo el audio en formato .mp3
        ydl_opts = {
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
            'ffmpeg_location': 'D:\Codes\Python\ffmpeg-2024-09-26-git-f43916e217-essentials_build\bin',  # Asegúrate de cambiar esta ruta a la correcta
            'outtmpl': '%(title)s.%(ext)s',  # Nombre de archivo de salida
        }
    else:
        # Opciones para descargar el video en formato .mp4
        ydl_opts = {
            'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4',
            'ffmpeg_location': 'D:\Codes\Python\ffmpeg-2024-09-26-git-f43916e217-essentials_build\bin',  # Asegúrate de cambiar esta ruta a la correcta
            'outtmpl': '%(title)s.%(ext)s',  # Nombre de archivo de salida
            'merge_output_format': 'mp4',    # Asegura que el video y audio se combinen en mp4
        }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([link])


# Ejecución
link = input("Ingresa el enlace del video de YouTube: ")
tipo = input("¿Qué deseas descargar? (video/audio): ").lower()

if tipo == 'audio':
    descargar(link, solo_audio=True)
elif tipo == 'video':
    descargar(link, solo_audio=False)
else:
    print("Opción no válida, elige entre 'video' o 'audio'.")
