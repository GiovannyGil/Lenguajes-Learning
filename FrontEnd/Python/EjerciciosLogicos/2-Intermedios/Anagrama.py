'''
Escribe una función que reciba dos palabras (String) y retorne
verdadero o falso (Bool) según sean o no anagramas.
- Un Anagrama consiste en formar una palabra reordenando TODAS
  las letras de otra palabra inicial.
- NO hace falta comprobar que ambas palabras existan.
- Dos palabras exactamente iguales no son anagrama.
'''


palabra1 = str(input('Ingrese una palabra: '))
palabra2 = str(input('Ingrese una palabra: '))


# funciona para identificar un anagrama
def Anagrama(palabra1, palabra2):
    # definir variables
    coincidencia = False
    nuevo = palabra1
    new = palabra2
    # volver palabras a listas
    cadena1 = list(nuevo)
    cadena2 = list(new)

    # ordenar listas
    cadena1.sort()
    cadena2.sort()

    # convertar nuevamente a cadena
    cadenaOrdenada1 = "".join(cadena1)
    cadenaOrdenada2 = "".join(cadena2)

    # comparar si son iguales
    if (cadenaOrdenada1 == cadenaOrdenada2):
        coincidencia = True
    else:
        coincidencia = False

    return coincidencia


# llamar funcion
ver = Anagrama(palabra1, palabra2)
# inprimir la funcion
print(ver)



'''
escritor = 'Fyodor Mikhailovich Dostoevsky'
cadenaInvertida = escritor[::-1]
print(cadenaInvertida)

forma corta de revertir una cadena de texto
'''