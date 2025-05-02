

# pedir un numero en consola
numero = int(input('ingrese un numero POSITIVO: '))



if(numero < 0):
    print('el número debe ser entero')
elif (numero == 0):
    print('el número no puede ser 0')
elif (numero > 0):
    print('el número es positivo')
else:
    print('algo salio mal')