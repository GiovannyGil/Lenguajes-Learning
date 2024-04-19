'''
Escribe un programa que reciba un texto y transforme lenguaje natural a
"lenguaje hacker" (conocido realmente como "leet" o "1337"). Este lenguaje
se caracteriza por sustituir caracteres alfanuméricos.
Utiliza esta tabla (https://www.gamehouse.com/blog/leet-speak-cheat-sheet/)
con el alfabeto y los números en "leet".
(Usa la primera opción de cada transformación. Por ejemplo "4" para la "a")
'''

# Importamos la librería para usar expresiones regulares
import re


# Definimos la función que transforma el texto
def leet(texto):
    # Definimos el diccionario con los caracteres a sustituir
    diccionario = {
        'a': '4', 'b': '8', 'c': '(', 'd': '[)',
        'e': '3', 'f': '|=', 'i': '1', 'j': '_|',
        'o': '0', 's': '5', 't': '7', 'u': '|_|',
        'v': '\/', 'x': '><', 'y': '`/', 'z': '2'
        }
    # Definimos la expresión regular para buscar las letras a sustituir
    regex = re.compile('|'.join(diccionario.keys()))
    # Sustituimos las letras por los caracteres correspondientes
    texto = regex.sub(lambda x: diccionario[x.group()], texto)
    # Devolvemos el texto transformado
    return texto


# Pedimos al usuario que introduzca el texto
texto = input('Introduce el texto a transformar: ')

# Imprimimos el texto transformado
print(leet(texto))

# Fin del programa
