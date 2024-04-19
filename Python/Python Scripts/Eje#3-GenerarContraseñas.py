'''
Escribe un programa que sea capaz de generar contraseñas de forma aleatoria.
Podrás configurar generar contraseñas con los siguientes parámetros:
- Longitud: Entre 8 y 16.
- Con o sin letras mayúsculas.
- Con o sin números.
- Con o sin símbolos.
(Pudiendo combinar todos estos parámetros entre ellos)
'''


# funcion para generar un conjunto de caracteres aleatorios
def GenerarContraseña():
    import random
    import string
    # caracteres a utilizar
    letras = string.ascii_letters  # usar ascii_letters para incluir letras mayusculas y minusculas
    numeros = string.digits  # usar digits para incluir numeros
    simbolos = string.punctuation  # usar punctuation para incluir simbolos
    # lista de caracteres a utilizar
    caracteres = []
    # lista de caracteres a utilizar
    caracteres = list(letras + numeros + simbolos)
    # longitud de la contraseña
    longitud = random.randint(8, 16)  # longitud aleatoria entre 8 y 16
    # contraseña
    contraseña = ""
    # bucle para generar la contraseña
    for i in range(longitud):
        # caracter aleatorio
        caracter = random.choice(caracteres)
        # añadir caracter a la contraseña
        contraseña += caracter
    # devolver contraseña
    return contraseña


print(GenerarContraseña())
